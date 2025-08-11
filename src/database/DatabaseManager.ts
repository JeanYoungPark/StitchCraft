import SQLite from 'react-native-sqlite-storage';
import {defaultPatterns} from './PatternData';
import {YouTubeCreditInfo} from '../types/YouTubeCredit';

// SQLite 디버그 모드 활성화 (개발 시에만)
SQLite.DEBUG(__DEV__);
SQLite.enablePromise(true);

// 사용자 프로필과 튜토리얼 진행상황 제거 - 불필요한 복잡성

export interface Pattern {
  id?: number;
  patternId: string;
  title: string;
  difficulty: '초급' | '중급' | '고급';
  duration: string;
  description: string;
  materials: string; // JSON string
  steps: string; // JSON string
  emoji: string;
  videoUrl?: string;
  youtubeCredit?: YouTubeCreditInfo;
  hasImages?: boolean;
  hasPattern?: boolean;
  createdAt?: string;
}

export interface Bookmark {
  id?: number;
  itemType: 'pattern' | 'tutorial' | 'guide';
  itemId: string;
  itemTitle: string;
  itemDescription?: string;
  createdAt?: string;
}

export interface AppSetting {
  id?: number;
  key: string;
  value: string;
  createdAt?: string;
  updatedAt?: string;
}

class DatabaseManager {
  private database: SQLite.SQLiteDatabase | null = null;
  private readonly databaseName = 'StitchCraft.db';
  private readonly databaseVersion = '1.0';
  private readonly databaseDisplayName = 'StitchCraft Database';
  private readonly databaseSize = 200000;
  private readonly currentDataVersion = '2.4'; // 패턴 데이터 버전 (채널명 수정)
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.initPromise = this.initializeDatabase();
  }

  // 데이터베이스 초기화 완료를 보장하는 메서드
  private async ensureInitialized(): Promise<void> {
    console.log(
      '🔄 ensureInitialized 시작, initPromise 존재:',
      !!this.initPromise,
    );
    if (this.initPromise) {
      console.log('🔄 initPromise 대기 중...');

      try {
        // 10초 timeout을 설정
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('InitPromise timeout')), 10000);
        });

        await Promise.race([this.initPromise, timeoutPromise]);
        console.log('✅ initPromise 완료됨');
      } catch (error) {
        console.error('❌ initPromise 대기 중 오류:', error);
        console.log('🔄 새로운 초기화 시도...');

        // 기존 initPromise 제거하고 새로 초기화
        this.initPromise = null;
        this.initPromise = this.initializeDatabase();
        await this.initPromise;
        console.log('✅ 새로운 초기화 완료');
      }
    } else {
      console.log('ℹ️ initPromise가 null임 - 새로운 초기화 시작');
      this.initPromise = this.initializeDatabase();
      await this.initPromise;
      console.log('✅ 새로운 초기화 완료');
    }
  }

  private async initializeDatabase(): Promise<void> {
    console.log('🔄 initializeDatabase 시작');
    try {
      console.log('🔄 SQLite.openDatabase 호출 중...');
      this.database = await SQLite.openDatabase({
        name: this.databaseName,
        version: this.databaseVersion,
        displayName: this.databaseDisplayName,
        size: this.databaseSize,
        location: 'default',
      });
      console.log('✅ SQLite.openDatabase 완료');

      console.log('🔄 createTables 호출 중...');
      await this.createTables();
      console.log('✅ createTables 완료');

      console.log('🔄 insertDefaultData 호출 중...');
      await this.insertDefaultData();
      console.log('✅ insertDefaultData 완료');

      console.log('✅ SQLite 데이터베이스 초기화 완료');
    } catch (error) {
      console.error('❌ 데이터베이스 초기화 실패:', error);
      console.error('❌ 초기화 실패 상세 정보:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.database) throw new Error('데이터베이스가 초기화되지 않았습니다');

    const tables = [
      // 패턴 테이블
      `CREATE TABLE IF NOT EXISTS patterns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pattern_id TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        difficulty TEXT NOT NULL CHECK(difficulty IN ('초급', '중급', '고급')),
        duration TEXT NOT NULL,
        description TEXT NOT NULL,
        materials TEXT NOT NULL,
        steps TEXT NOT NULL,
        emoji TEXT NOT NULL,
        video_url TEXT,
        youtube_credit TEXT,
        has_images BOOLEAN DEFAULT 0,
        has_pattern BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,

      // 북마크 테이블
      `CREATE TABLE IF NOT EXISTS bookmarks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_type TEXT NOT NULL CHECK(item_type IN ('pattern', 'tutorial', 'guide')),
        item_id TEXT NOT NULL,
        item_title TEXT NOT NULL,
        item_description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(item_type, item_id)
      )`,

      // 앱 설정 테이블
      `CREATE TABLE IF NOT EXISTS app_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
    ];

    for (const table of tables) {
      await this.database.executeSql(table);
    }

    // 기존 테이블에 youtube_credit 필드가 없다면 추가
    try {
      await this.database.executeSql(
        'ALTER TABLE patterns ADD COLUMN youtube_credit TEXT',
      );
      console.log('✅ YouTube 크레딧 필드 추가됨');
    } catch (error) {
      // 필드가 이미 존재하면 오류가 발생하지만 무시
      console.log('ℹ️ YouTube 크레딧 필드는 이미 존재하거나 추가 불가');
    }
  }

  private async insertDefaultData(): Promise<void> {
    if (!this.database) return;

    try {
      // 기본 앱 설정 생성
      const settings = [
        {key: 'app_version', value: '1.0.0'},
        {key: 'measurement_unit', value: 'metric'},
        {key: 'first_launch', value: 'true'},
      ];

      for (const setting of settings) {
        await this.database.executeSql(
          `INSERT OR IGNORE INTO app_settings (key, value) VALUES (?, ?)`,
          [setting.key, setting.value],
        );
      }

      console.log('✅ 기본 앱 설정 생성됨');

      // 기본 패턴 데이터 생성
      await this.insertDefaultPatterns();
    } catch (error) {
      console.error('기본 데이터 삽입 실패:', error);
    }
  }

  private async insertDefaultPatterns(): Promise<void> {
    if (!this.database) return;

    try {
      console.log('🔄 insertDefaultPatterns 시작');

      // 현재 저장된 데이터 버전 확인 (직접 SQL 사용해서 무한 재귀 방지)
      let currentVersion: string | null = null;
      try {
        const result = await this.database.executeSql(
          'SELECT value FROM app_settings WHERE key = ?',
          ['pattern_data_version'],
        );
        if (result[0].rows.length > 0) {
          currentVersion = result[0].rows.item(0).value;
        }
        console.log('📊 현재 패턴 데이터 버전:', currentVersion || '없음');
      } catch (error) {
        console.log('ℹ️ 패턴 데이터 버전 조회 실패, 새로 생성:', error);
        currentVersion = null;
      }

      if (currentVersion !== this.currentDataVersion) {
        console.log(
          `🔄 패턴 데이터 업데이트 필요: ${currentVersion || '없음'} → ${
            this.currentDataVersion
          }`,
        );

        // 기존 패턴 데이터 모두 삭제
        await this.database.executeSql('DELETE FROM patterns');
        console.log('✅ 기존 패턴 데이터 삭제됨');

        // 새로운 패턴 데이터 삽입
        console.log(`📊 삽입할 패턴 개수: ${defaultPatterns.length}`);

        for (let i = 0; i < defaultPatterns.length; i++) {
          const pattern = defaultPatterns[i];
          console.log(`📝 패턴 ${i + 1} 삽입 중: ${pattern.patternId}`);

          try {
            await this.database.executeSql(
              `INSERT INTO patterns (pattern_id, title, difficulty, duration, description, materials, steps, emoji, video_url, youtube_credit, has_images, has_pattern)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                pattern.patternId,
                pattern.title,
                pattern.difficulty,
                pattern.duration,
                pattern.description,
                JSON.stringify(pattern.materials),
                JSON.stringify(pattern.steps),
                pattern.emoji,
                pattern.videoUrl || null,
                pattern.youtubeCredit
                  ? JSON.stringify(pattern.youtubeCredit)
                  : null,
                pattern.hasImages ? 1 : 0,
                pattern.hasPattern ? 1 : 0,
              ],
            );
            console.log(`✅ 패턴 ${i + 1} 삽입 성공: ${pattern.patternId}`);
          } catch (error) {
            console.error(`❌ 패턴 ${i + 1} 삽입 실패:`, error);
            console.error('패턴 데이터:', pattern);
            throw error;
          }
        }

        // 데이터 버전 업데이트 (직접 SQL 사용해서 무한 재귀 방지)
        await this.database.executeSql(
          `INSERT OR REPLACE INTO app_settings (key, value, updated_at)
           VALUES (?, ?, CURRENT_TIMESTAMP)`,
          ['pattern_data_version', this.currentDataVersion],
        );
        console.log(
          `✅ 패턴 데이터 업데이트 완료: v${this.currentDataVersion}`,
        );
      } else {
        console.log(`✅ 패턴 데이터가 최신 버전입니다: v${currentVersion}`);
      }
    } catch (error) {
      console.error('패턴 데이터 동기화 실패:', error);
    }
  }

  // 온보딩 상태 관리
  async isQuickStartCompleted(): Promise<boolean> {
    await this.ensureInitialized();
    if (!this.database) throw new Error('데이터베이스가 초기화되지 않았습니다');

    try {
      const result = await this.database.executeSql(
        'SELECT value FROM app_settings WHERE key = ?',
        ['quick_start_completed'],
      );

      if (result[0].rows.length > 0) {
        return result[0].rows.item(0).value === 'true';
      }
      return false; // 기본값: 완료되지 않음
    } catch (error) {
      console.error('빠른 시작 상태 조회 실패:', error);
      return false;
    }
  }

  async setQuickStartCompleted(): Promise<void> {
    await this.ensureInitialized();
    if (!this.database) throw new Error('데이터베이스가 초기화되지 않았습니다');

    try {
      await this.database.executeSql(
        `INSERT OR REPLACE INTO app_settings (key, value, updated_at)
         VALUES (?, ?, CURRENT_TIMESTAMP)`,
        ['quick_start_completed', 'true'],
      );

      console.log('✅ 빠른 시작 완료 상태 저장됨');
    } catch (error) {
      console.error('빠른 시작 상태 저장 실패:', error);
      throw error;
    }
  }

  // 측정 단위 관리 (간소화)
  async getMeasurementUnit(): Promise<'metric' | 'imperial'> {
    await this.ensureInitialized();
    if (!this.database) throw new Error('데이터베이스가 초기화되지 않았습니다');

    try {
      const result = await this.database.executeSql(
        'SELECT value FROM app_settings WHERE key = ?',
        ['measurement_unit'],
      );

      if (result[0].rows.length > 0) {
        const value = result[0].rows.item(0).value;
        return value === 'imperial' ? 'imperial' : 'metric';
      }
      return 'metric';
    } catch (error) {
      console.error('측정 단위 조회 실패:', error);
      return 'metric';
    }
  }

  async setMeasurementUnit(unit: 'metric' | 'imperial'): Promise<void> {
    await this.ensureInitialized();
    if (!this.database) throw new Error('데이터베이스가 초기화되지 않았습니다');

    try {
      await this.database.executeSql(
        `INSERT OR REPLACE INTO app_settings (key, value, updated_at)
         VALUES (?, ?, CURRENT_TIMESTAMP)`,
        ['measurement_unit', unit],
      );

      console.log('✅ 측정 단위 업데이트 완료');
    } catch (error) {
      console.error('측정 단위 업데이트 실패:', error);
      throw error;
    }
  }

  // 데이터베이스 초기화 (개발용)
  async clearAllPatterns(): Promise<void> {
    await this.ensureInitialized();
    if (!this.database) throw new Error('데이터베이스가 초기화되지 않았습니다');

    try {
      await this.database.executeSql('DELETE FROM patterns');
      console.log('모든 패턴 데이터가 삭제되었습니다.');
    } catch (error) {
      console.error('패턴 데이터 삭제 실패:', error);
      throw error;
    }
  }

  // 패턴 데이터 강제 업데이트 (앱 업데이트 시 사용)
  async forceUpdatePatterns(): Promise<void> {
    console.log('🔄 패턴 데이터 강제 업데이트 시작...');

    console.log('🔄 1단계: 데이터베이스 초기화 확인 중...');
    await this.ensureInitialized();
    console.log('✅ 1단계: 데이터베이스 초기화 완료');

    if (!this.database) {
      console.error('❌ 데이터베이스가 null입니다');
      throw new Error('데이터베이스가 초기화되지 않았습니다');
    }
    console.log('✅ 데이터베이스 연결 확인됨');

    try {
      console.log('🔄 2단계: 기존 패턴 데이터 삭제 중...');
      await this.database.executeSql('DELETE FROM patterns');
      console.log('✅ 2단계: 기존 패턴 데이터 삭제 완료');

      console.log('🔄 3단계: defaultPatterns 데이터 접근 중...');
      console.log('defaultPatterns 타입:', typeof defaultPatterns);
      console.log('defaultPatterns 배열인가?', Array.isArray(defaultPatterns));

      // 새로운 패턴 데이터 삽입
      console.log(
        `📊 강제 업데이트: 삽입할 패턴 개수: ${defaultPatterns.length}`,
      );
      console.log('✅ 3단계: defaultPatterns 접근 성공');

      for (let i = 0; i < defaultPatterns.length; i++) {
        const pattern = defaultPatterns[i];
        console.log(
          `📝 강제 업데이트: 패턴 ${i + 1} 삽입 중: ${pattern.patternId}`,
        );

        try {
          console.log('🔄 4단계: JSON 직렬화 시작...');
          const materialsJson = JSON.stringify(pattern.materials);
          console.log('materials JSON 성공');

          const stepsJson = JSON.stringify(pattern.steps);
          console.log('steps JSON 성공');

          let youtubeCreditJson = null;
          if (pattern.youtubeCredit) {
            console.log('YouTube 크레딧 JSON 직렬화 중...');
            youtubeCreditJson = JSON.stringify(pattern.youtubeCredit);
            console.log('YouTube 크레딧 JSON 성공');
          } else {
            console.log('YouTube 크레딧 없음');
          }
          console.log('✅ 4단계: 모든 JSON 직렬화 완료');

          console.log('🔄 5단계: SQL 삽입 실행 중...');
          await this.database.executeSql(
            `INSERT INTO patterns (pattern_id, title, difficulty, duration, description, materials, steps, emoji, video_url, youtube_credit, has_images, has_pattern)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              pattern.patternId,
              pattern.title,
              pattern.difficulty,
              pattern.duration,
              pattern.description,
              materialsJson,
              stepsJson,
              pattern.emoji,
              pattern.videoUrl || null,
              youtubeCreditJson,
              pattern.hasImages ? 1 : 0,
              pattern.hasPattern ? 1 : 0,
            ],
          );
          console.log(
            `✅ 5단계: 패턴 ${i + 1} 삽입 성공: ${pattern.patternId}`,
          );
        } catch (error) {
          console.error(`❌ 강제 업데이트: 패턴 ${i + 1} 삽입 실패:`, error);
          console.error('패턴 데이터:', pattern);
          throw error;
        }
      }

      // 데이터 버전 업데이트
      await this.setSetting('pattern_data_version', this.currentDataVersion);
      console.log(
        `✅ 패턴 데이터 강제 업데이트 완료: v${this.currentDataVersion}`,
      );
    } catch (error) {
      console.error('패턴 데이터 강제 업데이트 실패:', error);
      throw error;
    }
  }

  // 패턴 관리
  async getPatterns(): Promise<Pattern[]> {
    await this.ensureInitialized();
    if (!this.database) throw new Error('데이터베이스가 초기화되지 않았습니다');

    try {
      const result = await this.database.executeSql(
        'SELECT * FROM patterns ORDER BY id ASC',
      );

      const patterns: Pattern[] = [];
      for (let i = 0; i < result[0].rows.length; i++) {
        const row = result[0].rows.item(i);
        patterns.push({
          id: row.id,
          patternId: row.pattern_id,
          title: row.title,
          difficulty: row.difficulty,
          duration: row.duration,
          description: row.description,
          materials: row.materials,
          steps: row.steps,
          emoji: row.emoji,
          videoUrl: row.video_url,
          youtubeCredit: row.youtube_credit
            ? JSON.parse(row.youtube_credit)
            : undefined,
          hasImages: Boolean(row.has_images),
          hasPattern: Boolean(row.has_pattern),
          createdAt: row.created_at,
        });
      }

      return patterns;
    } catch (error) {
      console.error('패턴 조회 실패:', error);
      throw error;
    }
  }

  async getPatternById(patternId: string): Promise<Pattern | null> {
    await this.ensureInitialized();
    if (!this.database) throw new Error('데이터베이스가 초기화되지 않았습니다');

    try {
      const result = await this.database.executeSql(
        'SELECT * FROM patterns WHERE pattern_id = ?',
        [patternId],
      );

      if (result[0].rows.length > 0) {
        const row = result[0].rows.item(0);
        return {
          id: row.id,
          patternId: row.pattern_id,
          title: row.title,
          difficulty: row.difficulty,
          duration: row.duration,
          description: row.description,
          materials: row.materials,
          steps: row.steps,
          emoji: row.emoji,
          videoUrl: row.video_url,
          youtubeCredit: row.youtube_credit
            ? JSON.parse(row.youtube_credit)
            : undefined,
          hasImages: Boolean(row.has_images),
          hasPattern: Boolean(row.has_pattern),
          createdAt: row.created_at,
        };
      }
      return null;
    } catch (error) {
      console.error('패턴 조회 실패:', error);
      throw error;
    }
  }

  // 북마크 관리
  async getBookmarks(): Promise<Bookmark[]> {
    await this.ensureInitialized();
    if (!this.database) throw new Error('데이터베이스가 초기화되지 않았습니다');

    try {
      const result = await this.database.executeSql(
        'SELECT * FROM bookmarks ORDER BY created_at DESC',
      );

      const bookmarks: Bookmark[] = [];
      for (let i = 0; i < result[0].rows.length; i++) {
        const row = result[0].rows.item(i);
        bookmarks.push({
          id: row.id,
          itemType: row.item_type,
          itemId: row.item_id,
          itemTitle: row.item_title,
          itemDescription: row.item_description,
          createdAt: row.created_at,
        });
      }

      return bookmarks;
    } catch (error) {
      console.error('북마크 조회 실패:', error);
      throw error;
    }
  }

  async addBookmark(
    bookmark: Omit<Bookmark, 'id' | 'createdAt'>,
  ): Promise<void> {
    await this.ensureInitialized();
    if (!this.database) throw new Error('데이터베이스가 초기화되지 않았습니다');

    try {
      await this.database.executeSql(
        `INSERT OR REPLACE INTO bookmarks (item_type, item_id, item_title, item_description)
         VALUES (?, ?, ?, ?)`,
        [
          bookmark.itemType,
          bookmark.itemId,
          bookmark.itemTitle,
          bookmark.itemDescription || '',
        ],
      );

      console.log('✅ 북마크 추가 완료');
    } catch (error) {
      console.error('북마크 추가 실패:', error);
      throw error;
    }
  }

  async removeBookmark(itemType: string, itemId: string): Promise<void> {
    await this.ensureInitialized();
    if (!this.database) throw new Error('데이터베이스가 초기화되지 않았습니다');

    try {
      await this.database.executeSql(
        'DELETE FROM bookmarks WHERE item_type = ? AND item_id = ?',
        [itemType, itemId],
      );

      console.log('✅ 북마크 제거 완료');
    } catch (error) {
      console.error('북마크 제거 실패:', error);
      throw error;
    }
  }

  // 앱 설정 관리
  async getSetting(key: string): Promise<string | null> {
    await this.ensureInitialized();
    if (!this.database) throw new Error('데이터베이스가 초기화되지 않았습니다');

    try {
      const result = await this.database.executeSql(
        'SELECT value FROM app_settings WHERE key = ?',
        [key],
      );

      if (result[0].rows.length > 0) {
        return result[0].rows.item(0).value;
      }
      return null;
    } catch (error) {
      console.error('설정 조회 실패:', error);
      throw error;
    }
  }

  async setSetting(key: string, value: string): Promise<void> {
    await this.ensureInitialized();
    if (!this.database) throw new Error('데이터베이스가 초기화되지 않았습니다');

    try {
      await this.database.executeSql(
        `INSERT OR REPLACE INTO app_settings (key, value, updated_at)
         VALUES (?, ?, CURRENT_TIMESTAMP)`,
        [key, value],
      );

      console.log('✅ 설정 저장 완료');
    } catch (error) {
      console.error('설정 저장 실패:', error);
      throw error;
    }
  }

  // 개발용 데이터베이스 상태 확인
  async debugDatabaseState(): Promise<void> {
    await this.ensureInitialized();
    if (!this.database) throw new Error('데이터베이스가 초기화되지 않았습니다');

    try {
      console.log('=== 데이터베이스 디버깅 정보 ===');

      // 현재 데이터 버전 확인
      const currentVersion = await this.getSetting('pattern_data_version');
      console.log('📊 현재 저장된 패턴 데이터 버전:', currentVersion || '없음');
      console.log('📊 예상 패턴 데이터 버전:', this.currentDataVersion);

      // 패턴 테이블 스키마 확인
      const tableInfo = await this.database.executeSql(
        'PRAGMA table_info(patterns)',
      );
      console.log('📋 패턴 테이블 필드들:');
      for (let i = 0; i < tableInfo[0].rows.length; i++) {
        const field = tableInfo[0].rows.item(i);
        console.log(`  - ${field.name}: ${field.type}`);
      }

      // 패턴 데이터 개수 확인
      const countResult = await this.database.executeSql(
        'SELECT COUNT(*) as count FROM patterns',
      );
      const patternCount = countResult[0].rows.item(0).count;
      console.log('📊 데이터베이스 패턴 개수:', patternCount);

      // 실제 패턴 데이터 확인
      if (patternCount > 0) {
        const patterns = await this.database.executeSql(
          'SELECT pattern_id, title, youtube_credit FROM patterns',
        );
        console.log('📋 저장된 패턴들:');
        for (let i = 0; i < patterns[0].rows.length; i++) {
          const pattern = patterns[0].rows.item(i);
          console.log(
            `  - ${pattern.pattern_id}: ${pattern.title} (YouTube: ${
              pattern.youtube_credit ? '있음' : '없음'
            })`,
          );
        }
      }

      console.log('=== 디버깅 정보 끝 ===');
    } catch (error) {
      console.error('데이터베이스 디버깅 실패:', error);
    }
  }

  // 개발/테스트용 메서드
  async clearAllData(): Promise<void> {
    await this.ensureInitialized();
    if (!this.database) throw new Error('데이터베이스가 초기화되지 않았습니다');

    try {
      const tables = ['patterns', 'bookmarks', 'app_settings'];

      for (const table of tables) {
        await this.database.executeSql(`DELETE FROM ${table}`);
      }

      await this.insertDefaultData();
      console.log('✅ 모든 데이터 초기화 완료');
    } catch (error) {
      console.error('데이터 초기화 실패:', error);
      throw error;
    }
  }

  // 데이터베이스 연결 종료
  async closeDatabase(): Promise<void> {
    if (this.database) {
      await this.database.close();
      this.database = null;
      console.log('✅ 데이터베이스 연결 종료');
    }
  }
}

// 싱글톤 인스턴스
export const databaseManager = new DatabaseManager();
export default DatabaseManager;
