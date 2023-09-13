from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import pyperclip


class ChordBook:
    SEARCH_URL = 'https://www.ultimate-guitar.com/search.php?type=300&title='

    def __init__(self):
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument('headless')  # headless: 브라우저를 띄우지 않고 실행
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
        self.search_result = None
        self.search_keyword = None
        self.page = 1

    def get_soup(self, html):
        return BeautifulSoup(html, 'html.parser')

    def search(self):
        if self.search_keyword is None:
            self.search_keyword = input('>> 검색할 노래나 가수를 입력해주세요: ')

        self.driver.get(f'{ChordBook.SEARCH_URL}{self.search_keyword}&page={self.page}')
        soup = self.get_soup(self.driver.page_source)
        result = []
        for row in soup.find_all('div', class_='LQUZJ'):
            row_data = []
            for i, c in enumerate(row):
                row_data.append(c.text)
                if i == 1:
                    anchor = c.select('a')
                    if anchor and anchor[0]:
                        row_data.append(anchor[0].get('href'))
                    else:
                        row_data.append('')

            result.append(row_data)
        self.search_result = result

    def change_page(self, key):
        if key == 'n':
            self.page += 1
        elif key == 'p':
            self.page -= 1
            if self.page == 0:
                self.page = 1
        self.search()

    def show_list(self):
        for i, row in enumerate(self.search_result):
            artist = row[0]
            song = row[1]
            row[2]
            rating = row[3]
            row[4]

            if i == 0:
                print('%-3s %-30s %-30s %-30s' % ('', artist, song, rating))
                print('-' * 100)
            else:
                print('%-3s %-30s %-30s %-30s' % (i, artist, song[:30], rating))

        if len(self.search_result) == 0:
            print('검색 결과가 없습니다')

    def run(self):
        try:
            while (True):
                if not self.search_result:
                    self.search()
                    self.show_list()

                user_input = input('>> 선택할 번호를 입력해주세요(help: h): ')

                if user_input == 'q':
                    break
                elif user_input == 'h':
                    print('>> 종료: q, 리스트 다시보기: l, 재검색: s, 다음/이전 페이지: n/p')
                elif user_input == 'l':
                    self.show_list()
                elif user_input == 's':
                    self.search_result = None
                    self.search_keyword = None
                    continue
                elif user_input in ['n', 'p']:
                    self.change_page(user_input)
                    self.show_list()
                elif user_input.isdigit():
                    result = ''
                    self.driver.get(self.search_result[int(user_input)][2])
                    soup = self.get_soup(self.driver.page_source)

                    info_section = soup.find('div', class_='P5g5A').find('table')
                    chord_section = soup.find('section', class_='P8ReX')

                    if chord_section:
                        for info in info_section:
                            result += info.text + '\n'
                        result += chord_section.text + '\n'

                        pyperclip.copy(result)
                        print(result)
                        print('-' * 100)
                    else:
                        print('>> 해당 페이지에 내용이 없습니다.')
                        self.show_list()
                else:
                    print('>> 올바른 번호를 입력해주세요...')
        finally:
            self.driver.close()


if __name__ == "__main__":
    ChordBook().run()
