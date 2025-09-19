import { Router } from "express";
import {
    getAllBooks,
    addBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
    getRecommendations,
    getBookById,
    getAvailableBooks
} from "../controllers/bookController";

const router: Router = Router();

/**
 * Define routes for book management
 */
router.get("/available", getAvailableBooks);
router.get("/", getAllBooks);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.post("/:id/borrow", borrowBook);
router.post("/:id/return", returnBook);
router.get("/recommendations", getRecommendations);
router.get("/:id", getBookById); 


export default router;