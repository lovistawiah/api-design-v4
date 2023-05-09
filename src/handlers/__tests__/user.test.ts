import * as user from '../users'
describe("user handler", () => {
    it("should create a new user", async () => {
        const req = { body: { username: "hiking", password: "@23443" } }
        const res = {
            json({ token }) {
                expect(token).toBeTruthy()
            }
        }
        await user.createNewUser(req, res, () => { })
    })
})