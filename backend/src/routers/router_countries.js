import {Router} from 'express';
import { count_count } from '../controllers/controller_countrie.js';

export const router = Router();

router.get('/countries',count_count)