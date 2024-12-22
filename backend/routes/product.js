import { Router } from "express";
import {
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsByOwner,
} from "../controllers/product.js";
import { jwtMiddleware } from "../middlewares/index.js";

const router = Router();

router.route("/").post(jwtMiddleware, addProduct);
router.route("/:productId").get(getProduct);
router.route("/").get(getProducts);
router.route("/").get(jwtMiddleware, getProductsByOwner);
router.route("/:productId").patch(jwtMiddleware, updateProduct);
router.route("/:productId").delete(jwtMiddleware, deleteProduct);

export default router;
