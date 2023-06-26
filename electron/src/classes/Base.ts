export class ErrorFactory {
    unknowReason() {
        return {
            status: "failed",
            reason: "UNKNOWN",
        };
    }
}

export class SuccessResultFactory {
    generateResponse(data: any) {
        return {
            status: "success",
            data,
        };
    }
}
