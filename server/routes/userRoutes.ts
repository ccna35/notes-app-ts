import express, { Request, Response } from "express";

const router = express.Router();

//Post Method
router.post("/new", (req: Request, res: Response) => {
  res.send("Post API");
});

//Get all Method
router.get("/getAll", (req: Request, res: Response) => {
  res.send("Get all users");
});

//Get by ID Method
router.get("/getOne/:id", (req: Request, res: Response) => {
  res.send("Get by ID API");
});

//Update by ID Method
router.put("/update/:id", (req: Request, res: Response) => {
  res.send("Update by ID API");
});

//Delete by ID Method
router.delete("/delete/:id", (req: Request, res: Response) => {
  res.send("Delete by ID API");
});

export default router;
