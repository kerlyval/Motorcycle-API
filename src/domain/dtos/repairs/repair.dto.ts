export class CreateRepairDTO {
	constructor(public readonly date: Date, public readonly userId: string) {}

	static create(object: { [key: string]: any }): [string?, CreateRepairDTO?] {
		const { date, userId } = object;

		if (!date) return ['Missing the date', undefined];
		if (!userId) return ['Missing the userId'];
		if (userId.length <= 6) return ['The userId must be at least 6 characters'];

		// si la ejecucion llega a este punto significa que todo esta bien

		return [undefined, new CreateRepairDTO(date, userId)];
	}
}
