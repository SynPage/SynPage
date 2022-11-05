using api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace api.Services;

public class TutorialsService
{
    private readonly IMongoCollection<Tutorial> _tutorialsCollection;

    public TutorialsService(
        IOptions<TutorialDatabaseSettings> tutorialDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            tutorialDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            tutorialDatabaseSettings.Value.DatabaseName);

        _tutorialsCollection = mongoDatabase.GetCollection<Tutorial>(
            tutorialDatabaseSettings.Value.TutorialsCollectionName);
    }

    public async Task<List<Tutorial>> GetAsync() =>
        await _tutorialsCollection.Find(_ => true).ToListAsync();

    public async Task<Tutorial?> GetAsync(string id) =>
        await _tutorialsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Tutorial newTutorial) =>
        await _tutorialsCollection.InsertOneAsync(newTutorial);

    public async Task UpdateAsync(string id, Tutorial updatedTutorial) =>
        await _tutorialsCollection.ReplaceOneAsync(x => x.Id == id, updatedTutorial);

    public async Task RemoveAsync(string id) =>
        await _tutorialsCollection.DeleteOneAsync(x => x.Id == id);
}