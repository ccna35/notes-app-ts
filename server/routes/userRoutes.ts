import express, { Request, Response, Router } from "express";

const router = Router();

//Post Method
router.post("/new", (req: Request, res: Response) => {
  console.log(req.body);
  res.sendStatus(200);
});

//Get all Method
router.get("/getAll", (req: Request, res: Response) => {
  res.send("Get all users");
});

//Get by ID Method
router.get("/getOne/:id", (req: Request, res: Response) => {
  res.send("Get one user");
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
