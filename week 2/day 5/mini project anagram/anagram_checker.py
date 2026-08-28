from pathlib import Path
from zipfile import ZipFile


class AnagramChecker:
    def __init__(self, file_path="sowpods.txt"):
        self.file_path = Path(file_path)
        if not self.file_path.is_absolute():
            self.file_path = Path(__file__).with_name(self.file_path.name)
        self.word_list = self._load_words()

    def _load_words(self):
        if self.file_path.suffix.lower() == ".zip":
            with ZipFile(self.file_path) as archive:
                text_files = [name for name in archive.namelist() if not name.endswith("/")]
                if not text_files:
                    return set()
                with archive.open(text_files[0]) as file:
                    content = file.read().decode("utf-8")
        else:
            content = self.file_path.read_text(encoding="utf-8")
        return {word.strip().casefold() for word in content.split() if word.strip()}

    def is_valid_word(self, word):
        return word.casefold() in self.word_list

    def is_anagram(self, word1, word2):
        return sorted(word1.casefold()) == sorted(word2.casefold())

    def get_anagrams(self, word):
        normalized_word = word.casefold()
        return sorted(
            candidate
            for candidate in self.word_list
            if candidate != normalized_word and self.is_anagram(normalized_word, candidate)
        )
