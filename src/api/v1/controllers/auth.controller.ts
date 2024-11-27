import { Request, Response } from 'express';
import asyncHandler from '../../../handlers/async.handler';
import ApiResponse from '../../../handlers/apiResponse.handler';
import { AuthRequest } from '../../../middlewares/auth.middleware';
import { authService } from '../services';
import { SignupDto, SigninDto } from '../dtos';

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const data: SignupDto = req.body;
  const newUser = await authService.signup(data);
  new ApiResponse(res, 200, 'Successfully Registered User', newUser);
});

export const signin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: SigninDto = req.body;
  const { user, refreshToken } = await authService.signin(email, password);

  // Set the refreshToken cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    // sameSite: 'strict', // development
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const data = {
    refreshToken,
    user,
  };

  new ApiResponse(res, 200, 'SignIn successful', data);
});

export const signout = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  await authService.signout(userId);

  // Remove refreshToken cookie
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  new ApiResponse(res, 200, 'Signout successful', {});
});
