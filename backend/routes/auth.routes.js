import { validate } from "../middlewares/validate.js";
import { registerSchema } from "../validator/authValidator.js";

app.post("/register", validate(registerSchema), controller);