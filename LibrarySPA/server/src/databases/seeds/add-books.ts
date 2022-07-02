/* eslint-disable prettier/prettier */
import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('books').del();
  await knex('authors').del();

  await knex('authors').insert([
    { id: 1, name: 'Scott Fitzgerald', age: 44, born: 'September 24 1896', died: 'December 21 1940', nationality: 'USA' },
    { id: 2, name: 'Ivan Vazov', age: 71, born: 'July 9 1850', died: 'September 22 1921', nationality: 'Bulgaria' },
    { id: 3, name: 'Eve Ocotillo' },
  ]);

  await knex('books').insert([
    {
      id: 1, title: 'The Great Gatsby', author: 1, genre: '1', pages: 208, date: 'Apr 10 1925',
      description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.The novel was inspired by a youthful romance Fitzgerald had with socialite Ginevra King, and the riotous parties he attended on Long Island\'s North Shore in 1922. Following a move to the French Riviera, Fitzgerald completed a rough draft of the novel in 1924. He submitted it to editor Maxwell Perkins, who persuaded Fitzgerald to revise the work over the following winter. After making revisions, Fitzgerald was satisfied with the text, but remained ambivalent about the book\'s title and considered several alternatives. Painter Francis Cugat\'s cover art greatly impressed Fitzgerald, and he incorporated aspects of it into the novel.After its publication by Scribner\'s in April 1925, The Great Gatsby received generally favorable reviews, though some literary critics believed it did not equal Fitzgerald\'s previous efforts. Compared to his earlier novels, Gatsby was a commercial disappointment, selling fewer than 20,000 copies by October, and Fitzgerald\'s hopes of a monetary windfall from the novel were unrealized. When the author died in 1940, he believed himself to be a failure and his work forgotten.During World War II, the novel experienced an abrupt surge in popularity when the Council on Books in Wartime distributed free copies to American soldiers serving overseas. This new-found popularity launched a critical and scholarly re-examination, and the work soon became a core part of most American high school curricula and a part of American popular culture. Numerous stage and film adaptations followed in the subsequent decades.Gatsby continues to attract popular and scholarly attention. Contemporary scholars emphasize the novel\'s treatment of social class, inherited versus self-made wealth, gender, race, and environmentalism, and its cynical attitude towards the American Dream. One persistent item of criticism is an allegation of antisemitic stereotyping. The Great Gatsby is widely considered to be a literary masterwork and a contender for the title of the Great American Novel.',
      picture_uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/330px-The_Great_Gatsby_Cover_1925_Retouched.jpg'
    },
    {
      id: 2, title: 'Tender Is the Night', author: 1, genre: '1', pages: 315, date: 'April 12 1934',
      description: 'Tender Is the Night is the fourth and final novel completed by American writer F. Scott Fitzgerald. Set in French Riviera during the twilight of the Jazz Age, the 1934 novel chronicles the rise and fall of Dick Diver, a promising young psychiatrist, and his wife, Nicole, who is one of his patients. The story mirrors events in the lives of the author and his wife Zelda Fitzgerald as Dick starts his descent into alcoholism and Nicole descends into mental illness.[3]Fitzgerald began the novel in 1925 after the publication of his third novel The Great Gatsby.[4][5] During the protracted writing process, the mental health of his wife rapidly deteriorated,[6] and she required extended hospitalization due to her suicidal and homicidal tendencies.[7] After her hospitalization in Baltimore, Maryland, the author rented the La Paix estate in the suburb of Towson to be close to his wife, and he continued working on the manuscript.[8]While working on the book, Fitzgerald was beset with financial difficulties and drank heavily. He borrowed money from both his editor Max Perkins and his agent Harold Ober as well as wrote short stories for commercial magazines. Fitzgerald completed the work in Fall 1933, and Scribner\'s Magazine serialized the novel in four installments between January and April 1934 before its publication on April 12, 1934.[9] Although artist Edward Shenton illustrated the serialization, he did not design the book\'s jacket.[1] The jacket was by an unknown artist, and Fitzgerald disliked it.[10] The title is taken from the poem "Ode to a Nightingale" by John Keats.[11]Two versions of the novel are in print.[4] The first version, published in 1934, uses flashbacks; the second, revised version, prepared by Fitzgerald\'s friend and noted critic Malcolm Cowley on the basis of notes for a revision left by Fitzgerald, is ordered chronologically and was first published posthumously in 1948. Critics have suggested that Cowley\'s revision was undertaken due to negative reviews of the temporal structure of the first version of the book.Fitzgerald considered the novel to be his masterwork.[12] Although it received a tepid response upon release, it has grown in acclaim over the years and is now regarded as among Fitzgerald\'s best works. In 1998, the Modern Library ranked the novel 28th on its list of the 100 best English-language novels of the 20th century.',
      picture_uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tender_Is_the_Night_%281934_1st_ed_dust_jacket%29.jpg/330px-Tender_Is_the_Night_%281934_1st_ed_dust_jacket%29.jpg'
    },
    {
      id: 3, title: 'Under the Yoke', author: 2, genre: '1', pages: 247, date: '1 January 1889',
      description: 'Under the Yoke (Bulgarian: Под игото - Pod Igoto), with subtitle A Romance of Bulgarian Liberty[1] is a historical novel by Bulgarian author Ivan Vazov written in 1887-1888 and published in parts 1889–1890 in a magazine The Collection of Folk Tales and in a single book 1894.[2][3] It is set in a small town in Central Bulgaria during the months leading up to the April Uprising in 1876 and is the most famous piece of classic Bulgarian literature. Under the Yoke has been translated into more than 30 languages. The English translation was made in 1894 by William Morfill and published by the London publishing house William Heinemann.',
      picture_uri: 'https://www.bing.com/th?id=A14426cbe7e0af879d2bb525f3e73c236&w=124&h=168&c=7&o=6&dpr=1.25&pid=SANGAM'
    },
    {
      id: 4, title: 'Nemili-nedragi / Немили-недраги', author: 2, genre: '5',
      date: '1 January 1883',
      picture_uri: 'https://www.bing.com/th?id=AMMS_a05c53c07ecd09276ae193f5b9a720fb&w=100&h=150&c=7&rs=1&qlt=80&pcl=f9f9f9&o=6&cdv=1&dpr=1.25&pid=16.1'
    },
    {
      id: 5, title: 'The Violet and the Tom', author: 3, genre: '1', date: '1 January 2009', pages: 295,
      description: 'In what might have been the middle ages, had neither Alexander the Great nor Jesus the prophet died young, the Greek State is a powerful economic force in southern Europe, and slavery is a profitable and well-entrenched social institution. Nygell, a Lord of the Northern Isles, is given the gift of a Grecian slave by the King. Nygell wants no such responsibility.A homoerotic romance. Set in an alternate universe with institutionalized slavery, thus consent is by nature dubious at best. Elements of BDSM.',
      picture_uri: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1295750108l/8164754.jpg'
    },
    {
      id: 6, title: 'Con Sangre', author: 3, genre: '1', pages: 275, date: '23 July 2014',
      description: 'On new world Philos, life continues to be a hardscrabble struggle for existence. Famine and poverty define life, vital energy sources are waning, and violence between religious factions is escalating into all-out civil war. And Trini society’s good Christian values make life especially precarious for those with secrets. When radio transmission from the Salt Valley uranium mine goes dark, Dustin jumps at the chance to investigate, seeing an escape from the insularity of his hometown and a chance to start over in the capital. Only problem is, his cowboy escort to the mine is a self-satisfied jerk. For his part, Thayil has carved himself a place in society riding shotgun for Trini cargo caravans, but La Sangre has just upped the stakes with raids in the Salt Valley. Now he’s charged with babysitting a sullen rich kid on a trip through hostile country. If they can keep from killing each other through this, Dustin and Thayil might find they have more in common than they think.',
      picture_uri: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1406225576l/22813006.jpg'
    },
  ]);
}
