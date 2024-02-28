import Room from '../models/room.model.js';

export const createRoom = async(req, res) => {
    const { roomname } = req.body;

    try {
        const existingRoom = await Room.findOne({ roomname });

        if (existingRoom) {
            return res.status(400).json({ error: 'Ya existe una sala con este nombre' });
        }

        const newRoom = new Room({ roomname });
        await newRoom.save();

        res.status(201).json(newRoom);
    } catch (error) {
        console.error('Error al crear la sala:', error);
        res.status(500).json({ error: 'Error en el servidor al crear la sala' });
    }
};

export const getAllRooms = async(req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error al obtener las salas:', error);
        res.status(500).json({ error: 'Error en el servidor al obtener las salas' });
    }
};

export const joinRoom = async(req, res) => {
    const { roomId } = req.params;
    const userId = req.user.id;

    try {
        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({ error: 'Sala no encontrada' });
        }

        if (room.users.includes(userId)) {
            return res.status(400).json({ error: 'El usuario ya está en la sala' });
        }


        room.users.push(userId);
        await room.save();

        res.status(200).json({ message: 'Usuario unido a la sala exitosamente' });
    } catch (error) {
        console.error('Error al unirse a la sala:', error);
        res.status(500).json({ error: 'Error en el servidor al unirse a la sala' });
    }
};


export const getUsersInRoom = async(req, res) => {
    const { roomId } = req.params;

    try {
        const room = await Room.findById(roomId).populate('users', 'username mode').populate('admin', 'username mode');

        if (!room) {
            return res.status(404).json({ error: 'Sala no encontrada' });
        }

        const usersWithAdmin = {
            admin: {
                username: room.admin.username,
                mode: room.admin.mode
            },
            users: room.users.map(user => ({
                username: user.username,
                mode: user.mode
            }))
        };

        res.status(200).json(usersWithAdmin);
    } catch (error) {
        console.error('Error al obtener usuarios en la sala:', error);
        res.status(500).json({ error: 'Error en el servidor al obtener usuarios en la sala' });
    }
};