namespace api.Models;

public class TutorialDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string TutorialsCollectionName { get; set; } = null!;
}