import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import * as bookService from "../services/bookService";

export const getAllBooks = (req: Request, res: Response): void => {
    try {
        const books = bookService.getAllBooks();
        res.status(HTTP_STATUS.OK).json({
            message: "Books retrieved",
            data: books,
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error retrieving books",
        });
    }
};

export const addBook = (req: Request, res: Response): void => {
    try {
        const newBook = req.body;
        const createdBook = bookService.addBook(newBook);
        res.status(HTTP_STATUS.CREATED).json({
            message: "Book added",
            data: createdBook,
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error adding book",
        });
    }
};

export const updateBook = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedBook = bookService.updateBook(id, updatedData);
        if (updatedBook) {
            res.status(HTTP_STATUS.OK).json({
                message: "Book updated",
                data: updatedBook,
            });
        } else {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Book not found",
            });
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error updating book",
        });
    }
};

export const deleteBook = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const success = bookService.deleteBook(id);
        if (success) {
            res.status(HTTP_STATUS.OK).json({ message: "Book deleted" });
        } else {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Book not found",
            });
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error deleting book",
        });
    }
};

export const borrowBook = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const borrowerId = req.body.borrowerId;
        const result = bookService.borrowBook(id, borrowerId);
        if (result) {
            res.status(HTTP_STATUS.OK).json({
                message: "Book borrowed",
                data: result,
            });
        } else {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Book not found or already borrowed",
            });
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error borrowing book",
        });
    }
};

export const returnBook = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const result = bookService.returnBook(id);
        if (result) {
            res.status(HTTP_STATUS.OK).json({ message: "Book returned" });
        } else {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Book not found or not currently borrowed",
            });
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error returning book",
        });
    }
};

export const getRecommendations = (req: Request, res: Response): void => {
    try {
        const recommendations = bookService.getRecommendations();
        res.status(HTTP_STATUS.OK).json({
            message: "Recommendations retrieved",
            data: recommendations,
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Error fetching recommendations",
        });
    }
};

/**GetBookByID controller */
export const getBookById = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || id.trim() === "") {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Book ID is required",
      data: null,
    });
  }

  const book = bookService.getBookById(id);

  if (!book) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: `Book with ID "${id}" not found`,
      data: null,
    });
  }

  const bookResponse = {
    ...book,
    borrowerId: book.borrowerId ?? null,
    dueDate: book.dueDate ?? null,
  };

  return res.status(HTTP_STATUS.OK).json({
    message: "Book retrieved successfully",
    data: bookResponse,
  });
};

/**getAvialableBooks controlller */
export const getAvailableBooks = (req: Request, res: Response) => {
  try {
    const availableBooks = bookService
      .getAllBooks()
      .filter((b) => !b.isBorrowed)
      .map((b) => ({
        ...b,
        borrowerId: b.borrowerId ?? null,
        dueDate: b.dueDate ?? null,
      }));

    return res.status(HTTP_STATUS.OK).json({
      message: "Available books retrieved successfully",
      data: availableBooks,
      count: availableBooks.length,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching available books",
      data: [],
      count: 0,
    });
  }
};



