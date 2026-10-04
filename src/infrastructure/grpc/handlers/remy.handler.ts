import * as grpc from "@grpc/grpc-js";
import * as remyProto from "../../../contracts/proto/remy";
import callbackError from "./callback.error";
import logger from "@shared/logger";
import ProcessUseCase from "../../../application/use-cases/process/process";

export class RemyHandler {
    constructor(
        private readonly processUseCase: ProcessUseCase,
    ) {
    }

    process = async (
        call: grpc.ServerUnaryCall<remyProto.RemyRequest, remyProto.RemyResponse>,
        callback: grpc.sendUnaryData<remyProto.RemyResponse>,
    ) => {
        try {
            const response = await this.processUseCase.execute(call.request);
            callback(null, response,);
        } catch (err) {
            logger.log(err);
            callbackError(callback, err,);
        }
    };
}

export default RemyHandler;
