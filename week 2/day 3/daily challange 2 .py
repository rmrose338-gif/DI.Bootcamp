# Challenge
french_words = ["Bonjour", "Au revoir", "Bienvenue", "A bientôt"]
translator = 'Translator'()

translated_words = {}
for word in french_words:
	translated_words[word] = translator.translate(word, src="fr", dest="en").text

print(translated_words)



