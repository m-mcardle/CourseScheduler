# This module provides methods to have colored io

class color:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def warn(msg):
    print(
        color.WARNING +
        msg +
        color.ENDC
    )

def info(msg):
    print(
        color.OKCYAN +
        msg +
        color.ENDC
    )

def error(msg):
    print(
        color.FAIL +
        msg +
        color.ENDC
    )

def success(msg):
    print(
        color.OKGREEN +
        msg +
        color.ENDC
    )

def get_input(msg):
    return input(
        color.BOLD +
        msg +
        color.ENDC
    )