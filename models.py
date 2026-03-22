from dataclasses import dataclass, field
from random import randint

@dataclass
class Task:
    name: str
    difficulty: int
    importance: int
    completed: bool = False
    id: int = field(default_factory=lambda: randint(1000, 9999))
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
        

@dataclass
class Habit:
    name: str
    cathegory: str
    completed: bool = False
    id: int = field(default_factory=lambda: randint(1000, 9999))
    
