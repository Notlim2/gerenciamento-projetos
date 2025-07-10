import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDto(
  dtoClass: any,
  source: "body" | "params" | "query" = "body"
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const data = req[source];

    const dtoObj = plainToInstance(dtoClass, data);
    const errors = await validate(dtoObj, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors: errors.map((e) => ({
          field: e.property,
          constraints: e.constraints,
        })),
      });
      return;
    }

    if (!res.locals.validated) {
      res.locals.validated = {};
    }
    res.locals.validated[source] = dtoObj;

    next();
  };
}
