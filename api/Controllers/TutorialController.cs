using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace TutorialApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TutorialsController : ControllerBase
{
    private readonly TutorialsService _tutorialsService;

    public TutorialsController(TutorialsService tutorialsService) =>
        _tutorialsService = tutorialsService;

    [HttpGet]
    public async Task<List<Tutorial>> Get() =>
        await _tutorialsService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Tutorial>> Get(string id)
    {
        var tutorial = await _tutorialsService.GetAsync(id);

        if (tutorial is null)
        {
            return NotFound();
        }

        return tutorial;
    }
    
    [HttpPost]
    public async Task<IActionResult> Post(Tutorial newTutorial)
    {
        await _tutorialsService.CreateAsync(newTutorial);

        return CreatedAtAction(nameof(Get), new { id = newTutorial.Id }, newTutorial);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Tutorial updatedTutorial)
    {
        var tutorial = await _tutorialsService.GetAsync(id);

        if (tutorial is null)
        {
            return NotFound();
        }

        updatedTutorial.Id = tutorial.Id;

        await _tutorialsService.UpdateAsync(id, updatedTutorial);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var tutorial = await _tutorialsService.GetAsync(id);

        if (tutorial is null)
        {
            return NotFound();
        }

        await _tutorialsService.RemoveAsync(id);

        return NoContent();
    }
}