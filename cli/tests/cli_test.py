import unittest
from cli import checkInput, invalidUsageError, getFileType, getFile

# usage python -m unittest .\tests\cli_test.py



class Test_Parser(unittest.TestCase): 

    def test_check_input_h(self):
        res = checkInput("-h")
        self.assertEqual(res,True)

    def test_check_input_q(self):
        with self.assertRaises(SystemExit) as cm:
            checkInput("-q")
        self.assertEqual(cm.exception.code, 2)
    
    def test_check_input_any(self):
        res = checkInput("-p")
        self.assertEqual(res,False)
        
    def test_filetype_csv(self):
        res = getFileType("expected.csv")
        self.assertEqual(res, "csv")

    def test_filetype_json(self):
        res = getFileType("expected.json")
        self.assertEqual(res, "json")

    def test_getfile_json(self):
        res, res2 = getFile(['-f', './tests/data/expected.json'])
        self.assertEqual(res, "./tests/data/expected.json")
        self.assertEqual(res2, "json")

    def test_getfile_csv(self):
        res, res2 = getFile(['-f', './tests/data/expected.csv'])
        self.assertEqual(res, "./tests/data/expected.csv")
        self.assertEqual(res2, "csv")

    def test_invalidUsageError(self):
        with self.assertRaises(SystemExit) as cm:
            invalidUsageError()
        self.assertEqual(cm.exception.code, 2)

if __name__ == '__main__':
    unittest.main()