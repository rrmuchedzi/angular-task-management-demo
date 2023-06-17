import { Types } from 'mongoose';
declare global {
    type ObjectIdType = Types.ObjectId;
    namespace Express {
        interface User {
            _id: string;
        }
    }
}
