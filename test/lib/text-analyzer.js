var TextAnalyzer = require('../../src/lib/text-analyzer');

describe('TextAnalyzer', function() {

  var exampleText = 'Rohrbach (PK) Es brodelte im Saal. Mächtig sauer und spürbar angestachelt von ihren Wortführern kritisierten Rohrer, Rinnberger und Gambacher die Windkraftplanung des Landkreises. Sie wollten Infos, bekamen jede Menge davon - und unter dem Strich stand ein Kompromiss.';
  var text;
  beforeEach(function() {
    text = new TextAnalyzer(exampleText);
  });

  it('tokenizes the given string', function() {
    var words = text.tokenize();
    expect(words instanceof Array).toBe(true);
  });

  it('reduces the text to only relevant words', function() {
    var allWords = text.tokenize();
    var words = text.reduce();
    expect(allWords.length > words.length).toBe(true);
  });

  describe('compare', function() {

    var text2, noMatch, substring;
    beforeEach(function() {
      text2 = new TextAnalyzer(exampleText);
      noMatch = new TextAnalyzer('foo bar true false');
      substring = new TextAnalyzer('Mächtig sauer und spürbar angestachelt von ihren Wortführern kritisierten Rohrer');
    });

    it('returns a number in percent', function() {
      expect(text2.compare(text)).toBe(100);
    });

    it('returns 0 when theres no match at all', function() {
      expect(text2.compare(noMatch)).toBe(0);
    });

    it('returns a number between 0 and 100 when there is some intersection', function() {
      var res = text2.compare(substring);
      expect(
        res > 0 && res < 100
      ).toBe(true);
    });
  });
});