' Filters courses in courses.csv by checked preferences
Sub FilterCourse()
    Worksheets("Courses").Activate
    If Worksheets("Calendar").CheckBoxes("MonCheckbox").Value = 1 Then
        Worksheets("Courses").Range("$A$1:$U$3036").AutoFilter Field:=10, Criteria1:=""
    End If
    If Worksheets("Calendar").CheckBoxes("TuesCheckbox").Value = 1 Then
        Worksheets("Courses").Range("$A$1:$U$3036").AutoFilter Field:=11, Criteria1:=""
    End If
    If Worksheets("Calendar").CheckBoxes("WedCheckbox").Value = 1 Then
        Worksheets("Courses").Range("$A$1:$U$3036").AutoFilter Field:=12, Criteria1:=""
    End If
    If Worksheets("Calendar").CheckBoxes("ThursCheckbox").Value = 1 Then
        Worksheets("Courses").Range("$A$1:$U$3036").AutoFilter Field:=13, Criteria1:=""
    End If
    If Worksheets("Calendar").CheckBoxes("FriCheckbox").Value = 1 Then
        Worksheets("Courses").Range("$A$1:$U$3036").AutoFilter Field:=14, Criteria1:=""
    End If
    If Worksheets("Calendar").CheckBoxes("MorningCheckbox").Value = 1 Then
        Worksheets("Courses").Range("$A$1:$U$3036").AutoFilter Field:=15, Criteria1:=""
    End If
    If Worksheets("Calendar").CheckBoxes("AfternoonCheckbox").Value = 1 Then
        Worksheets("Courses").Range("$A$1:$U$3036").AutoFilter Field:=16, Criteria1:=""
    End If
    If Worksheets("Calendar").CheckBoxes("LecCheckbox").Value = 1 Then
        Worksheets("Courses").Range("$A$1:$U$3036").AutoFilter Field:=17, Criteria1:=""
    End If
    If Worksheets("Calendar").CheckBoxes("LabCheckbox").Value = 1 Then
        Worksheets("Courses").Range("$A$1:$U$3036").AutoFilter Field:=18, Criteria1:=""
    End If
    If Worksheets("Calendar").CheckBoxes("SemCheckbox").Value = 1 Then
        Worksheets("Courses").Range("$A$1:$U$3036").AutoFilter Field:=19, Criteria1:=""
    End If
    If Worksheets("Calendar").CheckBoxes("DECheckbox").Value = 1 Then
        Worksheets("Courses").Range("$A$1:$U$3036").AutoFilter Field:=20, Criteria1:=""
    End If
    
    
    ' Clears all filters applied
    ' Worksheets("Courses").AutoFilter.ShowAllData
End Sub

' Unchecks all checkboxes
Sub UncheckBoxes()
    For Each box In ActiveSheet.CheckBoxes
        box.Value = xlOff
    Next box
    Worksheets("Courses").AutoFilter.ShowAllData
End Sub