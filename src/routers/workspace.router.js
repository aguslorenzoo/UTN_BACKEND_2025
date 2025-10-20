import express, { request } from 'express';
import WorkspaceRepository from '../repositories/workspace.repository.js';
import workspaceController from '../controllers/workspace.controller.js';

const workspaceRouter = express.Router()

workspaceRouter.get(
    '/all',
    workspaceController.getAll
)

export default workspaceRouter