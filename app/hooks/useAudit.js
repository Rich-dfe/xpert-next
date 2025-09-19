import { useCallback } from "react";
import helperService from "../service/helperService";

const useAuditTrail = () => {
    const recordAction = useCallback(async(action, metadata = {},uid) =>{
        try{
            const logData = {
                loggerUid: uid,
                logDateTime: Math.floor(Date.now() / 1000),
                userId: 'current user id',
                action: action,
                timestamp: new Date().toISOString(),
                //metadata: metadata
            }

            helperService.updateAuditTrail(action,logData);
        }catch(error){
            console.error('Failed to log audit event:', error);
        }
    },[]);
    return recordAction;
}

export default useAuditTrail;