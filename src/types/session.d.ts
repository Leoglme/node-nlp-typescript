export type Session = {
    message?: {
        address?: {
            conversation?: {
                id: string;
            };
        };
    };
    _activity?: {
        conversation?: {
            id: string;
        };
    };
}
