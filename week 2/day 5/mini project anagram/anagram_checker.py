from pathlib import Path
from zipfile import ZipFile


class AnagramChecker:
    """A class to find and validate anagrams from a word list file"""
    
    def __init__(self, file_path="sowpods.txt"):
        """Initialize with file path and load the word list"""
        self.file_path = Path(file_path)
        # If path is not absolute, use the same directory as this file
        if not self.file_path.is_absolute():
            self.file_path = Path(__file__).with_name(self.file_path.name)
        self.word_list = self._load_words()

    def _load_words(self):
        """Load words from either a ZIP file or a plain text file"""
        if self.file_path.suffix.lower() == ".zip":
            # Handle ZIP file - extract and read the first text file
            with ZipFile(self.file_path) as archive:
                text_files = [name for name in archive.namelist() if not name.endswith("/")]
                if not text_files:
                    return set()
                with archive.open(text_files[0]) as file:
                    content = file.read().decode("utf-8")
        else:
            # Handle plain text file
            content = self.file_path.read_text(encoding="utf-8")
        # Return a set of normalized (lowercased) words
        return {word.strip().casefold() for word in content.split() if word.strip()}

    def is_valid_word(self, word):
        """Check if the word exists in the word list"""
        return word.casefold() in self.word_list

    def is_anagram(self, word1, word2):
        """Check if two words are anagrams by comparing sorted letters"""
        return sorted(word1.casefold()) == sorted(word2.casefold())

    def get_anagrams(self, word):
        """Find all anagrams of a word in the word list"""
        normalized_word = word.casefold()
        return sorted(
            [
                candidate
                # Filter candidates that are anagrams but not the same word
                for candidate in self.word_list
                if candidate != normalized_word and self.is_anagram(normalized_word, candidate)
            ]
        )
