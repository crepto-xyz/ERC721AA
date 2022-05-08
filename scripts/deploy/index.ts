import { config as dotenvConfig } from "dotenv";
dotenvConfig();
import { deploy } from "./deploy";

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
