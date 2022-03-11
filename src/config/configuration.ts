import * as _ from 'lodash';

export const config = {
  whiteIps: (process.env.WHITE_IPS || '').split(',').map((ip) => _.trim(ip)),
};
