import { Request, Response } from 'express';
import {
  GenericAnyType,
  ResponseCode,
  StatusCode,
} from '../@types';
import { UserService, LivekitService } from '../service';

export const getLiveKitAccessToken = async (req: Request, res: Response) => {
  try {
    const { roomName, userId } = req.body;
    
    // TODO: get nickname from database and pass nickname instead of the userId
    // const user = await UserService.getUserById(userId);

    // if (!user) {
    //   return res.status(StatusCode.NOT_FOUND).json({
    //     status: !!ResponseCode.FAILURE,
    //     message: 'User not found',
    //     data: null,
    //   });
    // }

    const token = await LivekitService.getLivekitAccessToken({
      roomName,
      userId, // use nickname here. Nickname should be unique.
    });

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'Token generated successfully',
      data: token,
    });
  } catch (err: GenericAnyType) {
    return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server Error',
    });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { roomName, emptyTimeout, maxParticipants } = req.body;

    const response = await LivekitService.createRoom({
      roomName,
      emptyTimeout,
      maxParticipants
    });
    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'Room created successfully',
      data: response
    });
  } catch (err: GenericAnyType) {
    console.log(err, 'create room error');
    return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server Error',
    });
  }
}