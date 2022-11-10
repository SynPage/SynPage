using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Models;

public class Tutorial
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("Name")]
    public string Name { get; set; } = null!;

    public string TargetSite { get; set; } = null!;
    
    public List<TutorialStep> Steps { get; set; } = new List<TutorialStep>();
}