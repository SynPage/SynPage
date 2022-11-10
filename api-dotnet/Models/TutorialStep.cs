namespace api.Models;

public class TutorialStep
{
    public int Index { get; set; } = -1;
    public String StepName { get; set; } = null!;
    public List<TutorialBox> Components { get; set; } = new List<TutorialBox>();
}