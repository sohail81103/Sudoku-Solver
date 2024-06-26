//PROJECT ----> SUDOKU SOLVER
/*
#################
#################
#################
################# 
*/
#include<iostream>
using namespace std;

// Function to print the solved Sudoku
void print(int board[][9]) {
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            cout << board[i][j] << " ";
        }
        cout << endl;
    }
}

// Function to check if placing num at board[r][c] is valid
bool isValid(int board[][9], int num, int r, int c) {
    for (int i = 0; i < 9; i++) {
        if (board[i][c] == num) return false; // Check column
        if (board[r][i] == num) return false; // Check row
        if (board[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == num) return false; // Check 3x3 subgrid
    }
    return true;
}

// Function to solve the Sudoku using backtracking
bool solve(int board[][9]) {
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            if (board[i][j] == 0) {
                for (int num = 1; num <= 9; num++) {
                    if (isValid(board, num, i, j)) {
                        board[i][j] = num;
                        if (solve(board)) return true;
                        board[i][j] = 0; // Undo the change
                    }
                }
                return false; // No valid number found
            }
        }
    }
    return true; // Sudoku solved
}

void solveSudoku(int board[][9]) {
    solve(board);
    print(board);
}

int main() {
    int board[9][9] = {
        {5, 3, 0, 0, 7, 0, 0, 0, 0},
        {6, 0, 0, 1, 9, 5, 0, 0, 0},
        {0, 9, 8, 0, 0, 0, 0, 6, 0},
        {8, 0, 0, 0, 6, 0, 0, 0, 3},
        {4, 0, 0, 8, 0, 3, 0, 0, 1},
        {7, 0, 0, 0, 2, 0, 0, 0, 6},
        {0, 6, 0, 0, 0, 0, 2, 8, 0},
        {0, 0, 0, 4, 1, 9, 0, 0, 5},
        {0, 0, 0, 0, 8, 0, 0, 7, 9},
    };
    solveSudoku(board);
    return 0;
}