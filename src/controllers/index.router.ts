import { Router, Request, Response } from 'express';
import { ImageFilterRouter } from './v0/routes/image-filter-router'

const router: Router = Router();
router.use('/filteredimage', ImageFilterRouter);


export const IndexRouter: Router = router;