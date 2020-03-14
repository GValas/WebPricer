export interface IHttpResponse {
    request: {
        startDate: Date
        endDate: Date
        durationInMs: number
    }
    reponse: any
}
