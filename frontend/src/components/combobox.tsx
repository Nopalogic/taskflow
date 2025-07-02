import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getProjects } from "@/services/project";
import { Project } from "@/types/project";
import { Check, ChevronsUpDown } from "lucide-react"; // Common icons for combobox
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // For combining classNames

export function Combobox({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (projectId: string | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  // FIX 1: The internal state for the selected item is removed.
  // The `value` prop is now the single source of truth.

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        if (response.success) {
          setProjects(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // FIX 2: Find the full project object based on the `value` prop from the parent.
  const selectedProject = projects.find((project) => project.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* Using a more conventional combobox button style */}
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-48 justify-between font-normal"
        >
          {/* FIX 3: Display the title from the derived `selectedProject` object. */}
          {selectedProject ? selectedProject.title : "Select project"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0" side="right" align="start">
        <Command>
          <CommandInput placeholder="Find project..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {projects.map((project) => {
                return (
                  <CommandItem
                    key={project.id}
                    // FIX 4: The `value` here is for searching within the Command component.
                    // It should be the string that the user sees and searches for.
                    value={project.title}
                    onSelect={() => {
                      // FIX 5: Simplify the onSelect handler.
                      // If the same item is selected again, deselect it (optional but good UX).
                      onChange(project.id === value ? undefined : project.id);
                      setOpen(false); // Close the popover on selection.
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === project.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {project.title}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}