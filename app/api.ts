import {
  createStartAPIHandler,
  defaultAPIFileRouteHandler,
} from '@tanstack/start/api';

export const handler = defaultAPIFileRouteHandler;

export default createStartAPIHandler(handler);
