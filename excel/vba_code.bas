' Function that checks if a course is selected in any other cells
' @param CourseName - course name to check for
' @param Cell - cell location where course name was entered
' @returns Boolean
Function CheckIfCourseSelected(CourseName As String, Cell As String) As Boolean
    Dim I As Integer
    For I = 0 To 4 Step 1
        Dim CurrentCell As String
        CurrentCell = "I3" & (4 + I)

        If CurrentCell <> Cell Then
            If Range(CurrentCell).Value = CourseName Then
                CheckIfCourseSelected = True
            End If
        End If
    Next
End Function

' Subroutine to configure conditional formatting on the calendar
Sub ConfigureConditionalFormatting()
    Dim CalendarRange As Range
    Set CalendarRange = Worksheets("Calendar").Range("B3:F32")

    CalendarRange.FormatConditions.Delete

    CalendarRange.FormatConditions.Add Type:=xlTextString, TextOperator:=xlEndsWith, String:="LEC"
    CalendarRange.FormatConditions(1).Interior.Color = RGB(0, 102, 255)
    
    CalendarRange.FormatConditions.Add Type:=xlTextString, TextOperator:=xlEndsWith, String:="LAB"
    CalendarRange.FormatConditions(2).Interior.Color = RGB(0, 41, 102)
    
    CalendarRange.FormatConditions.Add Type:=xlTextString, TextOperator:=xlEndsWith, String:="SEM"
    CalendarRange.FormatConditions(3).Interior.Color = RGB(102, 163, 255)
End Sub


' Function to search the Courses worksheet for a course's information
' @param Cell1 - Location of course name cell to fill
' @param Cell2 - Location of meeting info cell to fill
' @param Cell3 - Location of professor name cell to fill
' @param Cell4 - Location of status cell to fill
' @param userCourse - Course name entered by user
Function GetCourse(Cell1 As String, Cell2 As String, Cell3 As String, Cell4 As String, userCourse As String) As Long
    Worksheets("Calendar").Unprotect
    Dim LecTime As String
    Dim ProfName As String
    Dim CourseName As String
    
    Worksheets("Calendar").Range(Cell1).Value = userCourse
    
    
    If userCourse = "" Then
        MsgBox "Can not be empty"
        Worksheets("Calendar").Range(Cell1).Value = ""
        Worksheets("Calendar").Range(Cell2).Value = ""
        Worksheets("Calendar").Range(Cell3).Value = ""
        Worksheets("Calendar").Range(Cell4).Value = ""
    Else
        Worksheets("Courses").Activate
        Dim Cell As Range
        Worksheets("Courses").Columns("C:C").Select
        '
        Set Cell = Selection.Find(What:=userCourse, After:=ActiveCell, LookIn:=xlFormulas, _
                LookAt:=xlWhole, SearchOrder:=xlByRows, SearchDirection:=xlNext, _
                MatchCase:=True, SearchFormat:=False)
        
        If Cell Is Nothing Then
            Worksheets("Calendar").Activate
            Worksheets("Calendar").Range(Cell2).Value = ""
            Worksheets("Calendar").Range(Cell3).Value = ""
            Worksheets("Calendar").Range(Cell4).Value = "Not Found"
            
        Else
            CourseName = Cell.Value
            LecTime = Cell.Offset(0, 2).Value
            ProfName = Cell.Offset(0, 3).Value

            Dim NotValid As Boolean
            NotValid = CheckIfCourseSelected(CourseName, Cell1)
            If NotValid = True Then
                MsgBox ("Error: Course is already selected.")
            Else
                Dim CalendarEntries() As String
                CalendarEntries = ParseMeetings(CourseName, LecTime, False)

                Dim ShortName As String
                ShortName = CalendarEntries(0, 3)

                Worksheets("Calendar").Activate
                Worksheets("Calendar").Range(Cell1).Value = CourseName
                Worksheets("Calendar").Range(Cell2).Value = LecTime
                Worksheets("Calendar").Range(Cell3).Value = ProfName
                Worksheets("Calendar").Range(Cell4).Value = "Found"

                Dim Collision As Boolean
                Collision = False

                Dim FillColumn As String
                Dim StartRow As String
                Dim EndRow As String
                Dim MeetingType As String

                Dim outer As Integer
                For outer = LBound(CalendarEntries, 1) To UBound(CalendarEntries, 1)
                    FillColumn = CalendarEntries(outer, 0)
                    StartRow = CalendarEntries(outer, 1)
                    EndRow = CalendarEntries(outer, 2)
                    MeetingType = CalendarEntries(outer, 4)

                    ' Ensure that this is a valid entry
                    If FillColumn <> "" Then
                        ' Check for collisions
                        If WorksheetFunction.CountA(Range(FillColumn & StartRow & ":" & FillColumn & EndRow)) <> 0 Then
                            Collision = True
                            Call MsgBoxCriticalIcon
                            Worksheets("Calendar").Range(Cell2).Value = ""
                            Worksheets("Calendar").Range(Cell3).Value = ""
                            Worksheets("Calendar").Range(Cell4).Value = "Conflict"
                            Exit For
                        End If
                    End If
                Next

                If Collision = False Then
                    For outer = LBound(CalendarEntries, 1) To UBound(CalendarEntries, 1)
                        FillColumn = CalendarEntries(outer, 0)
                        StartRow = CalendarEntries(outer, 1)
                        EndRow = CalendarEntries(outer, 2)
                        MeetingType = CalendarEntries(outer, 4)

                        ' Ensure that this is a valid entry
                        If FillColumn <> "" Then
                            ' Add to calendar
                            Range(FillColumn & StartRow) = ShortName & vbNewLine & MeetingType
                            With Range(FillColumn & StartRow & ":" & FillColumn & EndRow)
                                .Merge
                                .HorizontalAlignment = xlCenter
                                .VerticalAlignment = xlCenter
                            End With
                        End If
                    Next
                End If
            End If
        End If
    End If
    Worksheets("Calendar").Protect
End Function

' Subroutine to submit a course name to add to calendar
Sub Addbutton_Click()
    Dim userCourse As String
    userCourse = Worksheets("Calendar").Range("I34").Value
    Call GetCourse("I34", "J34", "K34", "L34", userCourse)
End Sub

' Subroutine to submit a course name to add to calendar
Sub Addbutton2_Click()
    Dim userCourse As String
    userCourse = Worksheets("Calendar").Range("I35").Value
    Call GetCourse("I35", "J35", "K35", "L35", userCourse)
End Sub

' Subroutine to submit a course name to add to calendar
Sub Addbutton3_Click()
    Dim userCourse As String
    userCourse = Worksheets("Calendar").Range("I36").Value
    Call GetCourse("I36", "J36", "K36", "L36", userCourse)
End Sub

' Subroutine to submit a course name to add to calendar
Sub Addbutton4_Click()
    Dim userCourse As String
    userCourse = Worksheets("Calendar").Range("I37").Value
    Call GetCourse("I37", "J37", "K37", "L37", userCourse)
End Sub

' Subroutine to submit a course name to add to calendar
Sub Addbutton5_Click()
    Dim userCourse As String
    userCourse = Worksheets("Calendar").Range("I38").Value
    Call GetCourse("I38", "J38", "K38", "L38", userCourse)
End Sub

' Function to parse the meeting information into a format we can use to create entries on the calendar
' @param CourseName - course name entered by user
' @param MeetingString - meeting information in raw string format
' @param Delete - boolean to determine if this is a delete operation or an addition operation
Function ParseMeetings(CourseName As String, MeetingString As String, Delete As Boolean) As String()
    Dim Str1 As String
    Dim Str2 As String
    
    Call ConfigureConditionalFormatting

    ' This ensures that we have a valid meeting string before parsing it
    If Len(MeetingString) < 5 Then
        Exit Function
    End If

    ' This removes the [' and '] and the start and end of the array string
    Str1 = Left(MeetingString, Len(MeetingString) - 2)
    Str2 = Right(Str1, Len(Str1) - 2)

    Dim Meetings() As String
    Meetings = Split(Str2, "', '")

    Dim MeetingType As String
    Dim Days() As String
    Dim MeetingTime As String
    Dim Location As String

    ' x - Max of 5 meetings?
    ' y - Output of GetCells + MeetingType = Column, StartRow, EndRow, ShortName, MeetingType
    Dim CalendarEntries(5, 5) As String

    Dim MeetingIndex As Integer
    MeetingIndex = 0

    For Each Meeting In Meetings
        Dim Rows() As String
        Rows = Split(Meeting, "\n")

        Dim I As Integer
        I = 0

        For Each Row In Rows

            If I = 0 Then
                Dim Arr() As String
                ' This seperates the meeting type from the list of days
                Arr = Split(Row, " ", 2)

                MeetingType = Arr(0)
                Days = Split(Arr(1), ", ")
            ElseIf I = 1 Then
                MeetingTime = Row
            ElseIf I = 2 Then
                Location = Row
            End If
            I = I + 1
        Next

        If MeetingType = "LEC" Or MeetingType = "LAB" Or MeetingType = "SEM" Then
            For Each MeetingDay In Days
                Dim Times() As String
                Times = Split(MeetingTime, " - ")

                ' This ensures that we have a valid Time array
                If UBound(Times) - LBound(Times) > 0 Then
                    Times(1) = Split(Times(1), " ", 2)(0)
                    
                    If Delete = True Then
                        Call DeleteCells(CourseName, MeetingType, (MeetingDay), Times)
                    Else
                        Dim Output() As String
                        Output = GetCells(CourseName, MeetingType, (MeetingDay), Times)
                        CalendarEntries(MeetingIndex, 0) = Output(0)
                        CalendarEntries(MeetingIndex, 1) = Output(1)
                        CalendarEntries(MeetingIndex, 2) = Output(2)
                        CalendarEntries(MeetingIndex, 3) = Output(3)
                        CalendarEntries(MeetingIndex, 4) = MeetingType
                    End If
                End If
            Next
        End If

        MeetingIndex = MeetingIndex + 1
    Next

    ParseMeetings = CalendarEntries
End Function

' Warning message for course time conflicts
Sub MsgBoxCriticalIcon()
    MsgBox "Course Time Conflict. Could not add a meeting to your calendar.", vbExclamation, "Warning"
End Sub

' Method that triggers a deletion of all calendar entries for a selected course
' @param Row - The Row # of the course selection being removed
Sub Clear(Row As String)
    Worksheets("Calendar").Unprotect

    Dim Name As String
    Dim MeetingInfo As String
    If IsEmpty(Range("I" & Row).Value) <> True And IsEmpty(Range("J" & Row).Value) <> True Then
        Name = Range("I" & Row).Value
        MeetingInfo = Range("J" & Row).Value
        Call ParseMeetings(Name, MeetingInfo, True)
    End If

    Worksheets("Calendar").Range("I" & Row & ":L" & Row).Select
    Selection.ClearContents

    Worksheets("Calendar").Protect
End Sub

' Subroutine to clear a course selection
Sub Clear_1()
    If MsgBox("Are you sure?", vbYesNo, "Confirm") = vbYes Then
        Clear ("34")
    End If
End Sub

' Subroutine to clear a course selection
Sub Clear_2()
    If MsgBox("Are you sure?", vbYesNo, "Confirm") = vbYes Then
        Clear ("35")
    End If
End Sub

' Subroutine to clear a course selection
Sub Clear_3()
    If MsgBox("Are you sure?", vbYesNo, "Confirm") = vbYes Then
        Clear ("36")
    End If
End Sub

' Subroutine to clear a course selection
Sub Clear_4()
    If MsgBox("Are you sure?", vbYesNo, "Confirm") = vbYes Then
        Clear ("37")
    End If
End Sub

' Subroutine to clear a course selection
Sub Clear_5()
    If MsgBox("Are you sure?", vbYesNo, "Confirm") = vbYes Then
        Clear ("38")
    End If
End Sub

' Subroutine to add a meeting to the calendar
' @param Name - Course name
' @param FillType - Type of meeting (LEC, LAB, etc...)
' @param Day - Day of meeting
' @param Time - Two element array containing start time and end time
Sub FillCells(Name As String, FillType As String, Day As String, ByRef Time() As String)
    Dim FillColumn As String
    Dim StartRow As String
    Dim EndRow As String
    Dim ShortName As String
    ShortName = Split(Name, " ", 2)(0)

    Worksheets("Calendar").Activate
    
    Dim StartTime As Date
    StartTime = CDate(Time(0))
    
    Dim EndTime As Date
    EndTime = CDate(Time(1))

    Dim Output() As String
    Output = FindMeetingRange(StartTime, EndTime, Day)

    FillColumn = Output(0)
    StartRow = Output(1)
    EndRow = Output(2)

    If FillColumn = "X" Then
        Exit Sub
    End If
    
    If WorksheetFunction.CountA(Range(FillColumn & StartRow & ":" & FillColumn & EndRow)) = 0 Then
        Range(FillColumn & StartRow) = ShortName & vbNewLine & FillType
        With Range(FillColumn & StartRow & ":" & FillColumn & EndRow)
            .Merge
            .HorizontalAlignment = xlCenter
            .VerticalAlignment = xlCenter
        End With
    Else
        Call MsgBoxCriticalIcon
    End If
End Sub

Function GetCells(Name As String, FillType As String, Day As String, ByRef Time() As String) As String()
    Dim FillColumn As String
    Dim StartRow As String
    Dim EndRow As String
    Dim ShortName As String
    ShortName = Split(Name, " ", 2)(0)

    Worksheets("Calendar").Activate
    
    Dim StartTime As Date
    StartTime = CDate(Time(0))
    
    Dim EndTime As Date
    EndTime = CDate(Time(1))

    Dim Output() As String
    Output = FindMeetingRange(StartTime, EndTime, Day)
    Output(3) = ShortName

    GetCells = Output
End Function

' Subroutine to remove a meeting to the calendar
' @param Name - Course name
' @param FillType - Type of meeting (LEC, LAB, etc...)
' @param Day - Day of meeting
' @param Time - Two element array containing start time and end time
Sub DeleteCells(Name As String, FillType As String, Day As String, ByRef Time() As String)
    Dim FillColumn As String
    Dim StartRow As String
    Dim EndRow As String
    Dim ShortName As String
    ShortName = Split(Name, " ", 2)(0)

    Worksheets("Calendar").Activate
    
    Dim StartTime As Date
    StartTime = CDate(Time(0))
    
    Dim EndTime As Date
    EndTime = CDate(Time(1))

    Dim Output() As String
    Output = FindMeetingRange(StartTime, EndTime, Day)

    FillColumn = Output(0)
    StartRow = Output(1)
    EndRow = Output(2)

    If FillColumn = "X" Then
        Exit Sub
    End If

    Range(FillColumn & StartRow) = ""
    With Range(FillColumn & StartRow & ":" & FillColumn & EndRow)
        .UnMerge
    End With
End Sub


' Function to find the range to use for a given meeting
' @param StartTime
' @param EndTime
' @param Day - Day of meeting
' @returns Array of strings containing column, start row, and end row
Function FindMeetingRange(StartTime As Date, EndTime As Date, Day As String) As String()
    Dim Output(3) As String
    If Day = "Mon" Then
        Output(0) = "B"
    ElseIf Day = "Tues" Then
        Output(0) = "C"
    ElseIf Day = "Wed" Then
        Output(0) = "D"
    ElseIf Day = "Thur" Then
        Output(0) = "E"
    ElseIf Day = "Fri" Then
        Output(0) = "F"
    Else
        Output(0) = "X"
    End If

    Output(1) = CStr(Worksheets("Calendar").Range("A3:A32").Find(StartTime).Row)
    If Minute(EndTime) <> 0 And Minute(EndTime) <> 30 Then
        Output(2) = CStr(Worksheets("Calendar").Range("A3:A32").Find(DateAdd("n", 10, CStr(EndTime))).Row)
    Else
        Output(2) = CStr(Worksheets("Calendar").Range("A3:A32").Find(EndTime).Row)
    End If

    FindMeetingRange = Output
End Function

' Subroutine clears all selected courses
Sub ClearAll()
    Worksheets("Calendar").Unprotect
    If MsgBox("Are you sure?", vbYesNo, "Confirm") = vbYes Then
        Clear ("34")
        Clear ("35")
        Clear ("36")
        Clear ("37")
        Clear ("38")
    End If
    Worksheets("Calendar").Protect
End Sub

' Filters courses in courses.csv by checked preferences
Sub FilterCourse()
    Worksheets("Courses").Activate
    If Worksheets("Calendar").CheckBoxes("MonCheckbox").Value = 1 Then
        Worksheets("Courses").Range("A1").AutoFilter Field:=5, Criteria1:="*Mon*"
    End If
    If Worksheets("Calendar").CheckBoxes("TuesCheckbox").Value = 1 Then
        Worksheets("Courses").Range("A1").AutoFilter Field:=5, Criteria1:="*Tues*"
    End If
    If Worksheets("Calendar").CheckBoxes("WedCheckbox").Value = 1 Then
        Worksheets("Courses").Range("A1").AutoFilter Field:=5, Criteria1:="*Wed*"
    End If
    If Worksheets("Calendar").CheckBoxes("ThursCheckbox").Value = 1 Then
        Worksheets("Courses").Range("A1").AutoFilter Field:=5, Criteria1:="*Thur*"
    End If
    If Worksheets("Calendar").CheckBoxes("FriCheckbox").Value = 1 Then
        Worksheets("Courses").Range("A1").AutoFilter Field:=5, Criteria1:="*Fri*"
    End If
    If Worksheets("Calendar").CheckBoxes("MorningCheckbox").Value = 1 Then
        Worksheets("Courses").Range("A1").AutoFilter Field:=5, Criteria1:="*AM*"
    End If
    If Worksheets("Calendar").CheckBoxes("AfternoonCheckbox").Value = 1 Then
        Worksheets("Courses").Range("A1").AutoFilter Field:=5, Criteria1:="*PM*"
    End If
    If Worksheets("Calendar").CheckBoxes("LecCheckbox").Value = 1 Then
        Worksheets("Courses").Range("A1").AutoFilter Field:=5, Criteria1:="*LEC*"
    End If
    If Worksheets("Calendar").CheckBoxes("LabCheckbox").Value = 1 Then
        Worksheets("Courses").Range("A1").AutoFilter Field:=5, Criteria1:="*LAB*"
    End If
    If Worksheets("Calendar").CheckBoxes("SemCheckbox").Value = 1 Then
        Worksheets("Courses").Range("A1").AutoFilter Field:=5, Criteria1:="*SEM*"
    End If
    If Worksheets("Calendar").CheckBoxes("DECheckbox").Value = 1 Then
        Worksheets("Courses").Range("A1").AutoFilter Field:=5, Criteria1:="*Distance Education*"
    End If
    
    ' Clears all filters applied
    ' Worksheets("Courses").AutoFilter.ShowAllData
End Sub

' Unchecks all checkboxes
Sub UncheckBoxes()
    For Each box In ActiveSheet.CheckBoxes
        box.Value = xlOff
    Next box
End Sub
