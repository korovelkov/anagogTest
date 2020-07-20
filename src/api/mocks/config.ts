export default {
  AnagogDefaultConfig: {
    Metadata: {
      Build: 10,
      Comment: 'Update URLs to staging and change path of schedule and profile',

      Version: '2018-12-18 13:00',
    },
    Operational: {
      ActivityRecognition: {
        Active: true,
        DBSizeLimit: {
          MaxRows: -1,
          MaxTime: -1,
          RowsToDelete: 0,
          TimeToDelete: 0,
        },
        Notify: true,
        Report: {
          Historical: {
            Interval: 1440,
            MaxRetryTime: 240,
            Unmetered: 1,
            Url: 'https://url/reports/activities/historical',
          },
          Mode: 'Off',
          Realtime: {
            Url: 'https://url/reports/activities/realtime',
          },
        },
      },
      Analytics: {
        Active: true,
        Report: {
          Active: false,
          Interval: 1440,
          MaxRetryTime: 240,
          Unmetered: 1,
          Url: 'https://url/reports/analytics',
        },
      },
      JedAI: {
        Active: true,
      },
      Locations: {
        DBSizeLimit: {
          MaxRows: -1,
          MaxTime: -1,
          RowsToDelete: 0,
          TimeToDelete: 0,
        },
        Notify: false,
        Report: {
          Historical: {
            Interval: 1440,
            MaxRetryTime: 240,
            Unmetered: 1,
            Url: 'https://url/reports/locations/historical',
          },
          Mode: 'Off',
          Realtime: {
            Url: 'https://url/reports/locations/realtime',
          },
        },
      },
      Privacy: {
        UserCentric: false,
      },
      UserProfile: {
        Active: false,
        Report: {
          Active: false,
          Interval: 1440,
          MaxRetryTime: 240,
          Unmetered: 1,
          Url: 'https://url/reports/profiles/periodical',
        },
      },
      UserSchedule: {
        Active: false,
        Report: {
          Active: false,
          Interval: 1440,
          MaxRetryTime: 240,
          Unmetered: 1,
          Url: 'https://url/reports/schedules/periodical',
        },
      },
      Visits: {
        Active: true,
        DBSizeLimit: {
          MaxRows: -1,
          MaxTime: -1,
          RowsToDelete: 0,
          TimeToDelete: 0,
        },
        NotInPOI: true,
        Notify: true,
        Report: {
          Historical: {
            Interval: 1440,
            MaxRetryTime: 240,
            Unmetered: 1,
            Url: 'https://url/reports/visits/historical',
          },
          Mode: 'Off',
          Realtime: {
            Url: 'https://url/reports/visits/realtime',
          },
        },
        VisitRadius: 50,
      },
    },
    Services: {
      Config: {
        Interval: 600,
        MaxRetryTime: 1080,
        Unmetered: 1,
        Url: 'https://url/config/consume/download',
      },
      CrashReport: {
        Active: true,
      },
      POI: {
        Active: true,
        Notify: true,
        RefreshRadius: 2000,
        RefreshThreshold: 10,
        Url: 'https://eapipoi.anagog.com/api/poi/',
      },
    },
  },
};
