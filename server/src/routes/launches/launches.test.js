const request = require('supertest');
const app = require('../../app');
const {mongooseConnect, mongooseDisconnect} = require('../../services/mongo')

const PostData = {
    mission: 'Arman-110',
    rocket: 'Ana-220',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler'
}

const PostDataMissing = {
    mission: 'Arman-110',
    rocket: 'Ana-220',
    launchDate: new Date('December 27, 2030')
}
describe('test launches API', ()=>{
    beforeAll(async ()=>{
        await mongooseConnect();
        await readAllDataPromise;
    });
    afterAll(async ()=>{
        await mongooseDisconnect();
    })

    describe('test POST /launches', ()=>{
        test('success code', async ()=>{
            const response = await request(app).post('/launches')
            .send(PostData);
            expect(response.statusCode).toBe(201);
            expect(response.body).toMatchObject({
                mission: 'Arman-110',
                rocket: 'Ana-220',
                target: 'Kepler'
            })
            expect(new Date(response.body.launchDate).valueOf()).toBe(PostData.launchDate.valueOf());
        });
    
        test('missing data', async ()=>{
            const response = await request(app).post('/launches')
            .send(PostDataMissing);
            expect(response.statusCode).toBe(400);
            expect(response.body).toMatchObject({
                error: "missing properties!"
    
            });
    
        });
    
    
    });
})