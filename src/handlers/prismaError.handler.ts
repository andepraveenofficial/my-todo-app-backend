import { Prisma } from '@prisma/client';
import ApiError from './apiError.handler';

type PrismaErrorTypes =
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientValidationError
  | Prisma.PrismaClientInitializationError;

export const handlePrismaError = (error: PrismaErrorTypes): ApiError => {
  // Handle Known Request Errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const errorMap: { [key: string]: ApiError } = {
      P2002: new ApiError(
        409,
        `Duplicate entry for ${error.meta?.target as string}`,
      ),
      P2025: new ApiError(404, 'Record not found'),
      P2003: new ApiError(400, 'Invalid reference: Related record not found'),
      P2014: new ApiError(400, 'Invalid ID format or value'),
    };

    return (
      errorMap[error.code] ||
      new ApiError(500, 'Prisma Database Connection Error')
    );
  }

  // Handle Validation Errors
  if (error instanceof Prisma.PrismaClientValidationError) {
    return new ApiError(400, 'Invalid data provided');
  }

  // Handle Initialization Errors
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return new ApiError(500, 'Database connection error');
  }

  // Default Error
  return new ApiError(500, 'Internal Server Error');
};
