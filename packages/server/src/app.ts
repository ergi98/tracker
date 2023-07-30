import express, {
  type Request,
  type Response,
  type Application,
  type NextFunction,
} from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello");
});

app.listen(8218, () => console.log("Server running"));
