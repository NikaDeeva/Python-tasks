from dataclasses import dataclass


@dataclass
class Task:
    name: str
    difficulty: int
    importance: int
    completed: bool = False
    def isImportant(self):
        if self.importance >= 3:
            return 'This task is important'
        else:
            return 'This task is not important'
    def isDifficult(self):
        if self.difficulty >= 2:
            return 'This task is difficult'
        else:
            return 'This task is not difficult'
        

