import { Request, Response } from 'express';
import { GenericAnyType, ResponseCode, StatusCode } from '../@types';
import { LivekitService } from '../service';

export const getLiveKitAccessToken = async (req: Request, res: Response) => {
  try {
    const { roomName, userId } = req.body;

    const room = await LivekitService.listRooms([roomName]);

    if (!room || room.length === 0) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'room not found',
      });
    }

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
      maxParticipants,
    });
    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'Room created successfully',
      data: response,
    });
  } catch (err: GenericAnyType) {
    console.log(err, 'create room error');
    return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server Error',
    });
  }
};

export const listRooms = async (req: Request, res: Response) => {
  try {
    const response = await LivekitService.listRooms();
    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'List of rooms',
      data: response,
    });
  } catch (err: GenericAnyType) {
    console.log(err, 'create room error');
    return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server Error',
    });
  }
};


export const getRoom = async (req: Request, res: Response) => {
  try {
    const { roomName } = req.params;

    const room = await LivekitService.listRooms([roomName]);

    if (!room || room.length === 0) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'room not found',
      });
    }

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'Room fetch successful',
      data: room,
    });
  } catch (err: GenericAnyType) {
    return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server Error',
    });
  }
};


export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const { roomName } = req.body;

    const room = await LivekitService.listRooms([roomName]);

    if (!room || room.length === 0) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'room not found',
      });
    }

    const response = await LivekitService.deleteRoom(roomName);

    if (response) {
    return res.status(StatusCode.NO_CONTENT).json({
      status: !!ResponseCode.SUCCESS,
      message: 'Room deleted successful',
      data: room,
    });
  }
      return res.status(StatusCode.BAD_REQUEST).json({
        status: !!ResponseCode.FAILURE,
        message: 'delete room request was not successful',
      });
  } catch (err: GenericAnyType) {
    return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server Error',
    });
  }
};

export const listParticipants = async (req: Request, res: Response) => {
  try {
    const { roomName } = req.params;

    const room = await LivekitService.listRooms([roomName]);

    if (!room || room.length === 0) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'room not found',
      });
    }

    const participants = await LivekitService.listParticipants(roomName);

    console.log(participants, 'participants')

    if (!participants) {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: !!ResponseCode.FAILURE,
        message: 'participants not found',
      });
    }

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'participants fetch successful',
      data: participants,
    });
  } catch (err: GenericAnyType) {
    return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server Error',
    });
  }
};

export const getParticipant = async (req: Request, res: Response) => {
  try {
    const { roomName, userId } = req.params;

    const room = await LivekitService.listRooms([roomName]);

    if (!room || room.length === 0) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'room not found',
      });
    }

    const participant = await LivekitService.getParticipant(roomName, userId);

    if (!participant) {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: 'participant not found'
      })
    }

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'participant fetch successful',
      data: participant,
    });
  } catch (err: GenericAnyType) {
    return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server Error',
    });
  }
};

export const updateParticipant = async (req: Request, res: Response) => {
  try {
    const { roomName, userId } = req.params;
    const { metadata, permissions } = req.body;

    const room = await LivekitService.listRooms([roomName]);

    if (!room || room.length === 0) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'room not found',
      });
    }

    const participant = await LivekitService.getParticipant(roomName, userId);

    if (!participant) {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: !!ResponseCode.FAILURE,
        message: 'participant not found',
      });
    }

    const response = await LivekitService.updateParticipant(
      roomName,
      userId,
      {
        metadata,
        permissions
      }
    );

    if (response) {
      return res.status(StatusCode.OK).json({
        status: !!ResponseCode.SUCCESS,
        message: 'participant update successful',
      });
    }

    return res.status(StatusCode.BAD_REQUEST).json({
      status: !!ResponseCode.FAILURE,
      message: 'participant update not successful',
    });
  } catch (err: GenericAnyType) {
    return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: err.message || 'Server Error',
    });
  };
};

export const removeParticipant = async (req: Request, res: Response) => {
    try {
      const { roomName, userId } = req.params;

    const room = await LivekitService.listRooms([roomName]);

    if (!room || room.length === 0) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'room not found',
      });
    }

    const participant = await LivekitService.getParticipant(roomName, userId);

    if (!participant) {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: !!ResponseCode.FAILURE,
        message: 'participant not found',
      });
    }

      const response = await LivekitService.removeParticipant(roomName, userId);

      if (response) {
        return res.status(StatusCode.NO_CONTENT).json({
          status: !!ResponseCode.SUCCESS,
          message: 'participant remove successful',
        });
      }

      return res.status(StatusCode.BAD_REQUEST).json({
        message: 'participant remove not successful'
      })
    } catch (err: GenericAnyType) {
      return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
        status: !!ResponseCode.FAILURE,
        message: err.message || 'Server Error',
      });
    }
  };
  
export const muteParticipant = async (req: Request, res: Response) => {
    try {
      const { roomName, userId, trackSID, isMute } = req.params;

    const room = await LivekitService.listRooms([roomName]);

    if (!room || room.length === 0) {
      return res.status(StatusCode.NOT_FOUND).json({
        status: !!ResponseCode.FAILURE,
        message: 'room not found',
      });
    }

    const participant = await LivekitService.getParticipant(roomName, userId);

    if (!participant) {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: !!ResponseCode.FAILURE,
        message: 'participant not found',
      });
    }

      const response = await LivekitService.muteParticipant(
        roomName,
        userId,
        trackSID,
        !!Number(isMute)
      );

      if (response) {
        return res.status(StatusCode.NO_CONTENT).json({
          status: !!ResponseCode.SUCCESS,
          message: 'participant mute successful',
        });
      }

      return res.status(StatusCode.BAD_REQUEST).json({
        status: !!ResponseCode.FAILURE,
        message: 'participant mute not successful'
      })
    } catch (err: GenericAnyType) {
      return res.status(err.status || StatusCode.INTERNAL_SERVER_ERROR).json({
        status: !!ResponseCode.FAILURE,
        message: err.message || 'Server Error',
      });
    }
  };
