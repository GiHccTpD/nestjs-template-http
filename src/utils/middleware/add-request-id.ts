import { v4 as uuidv4 } from 'uuid';
export function addRequestId(req, res, next) {
  res.set('X-Request-Id', uuidv4());
  next();
}
