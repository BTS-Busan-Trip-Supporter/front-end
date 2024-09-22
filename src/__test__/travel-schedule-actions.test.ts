import {
  createTravelScheduleStore,
  Destination,
} from '@/features/travel-schedule';

describe('여행 관련 일정 로직 테스트', () => {
  test('초기 상태는 반드시 비어 있는 배열이어야 합니다', () => {
    const store = createTravelScheduleStore();

    const schedules = store.getState().schedules;

    expect(schedules.length).toEqual(0);
  });

  test('여행 일자를 추가하였을 때, 정상적으로 추가되어야 합니다', () => {
    const store = createTravelScheduleStore();

    const { schedules, addDaySchedule } = store.getState();
    addDaySchedule();

    expect(store.getState().schedules.length).not.toEqual(schedules.length);
  });

  test('목적지를 추가하였을 때, 정상적으로 추가되어야 합니다', () => {
    const store = createTravelScheduleStore();

    const destination: Destination = {
      id: 'test-id',
      name: 'test-name',
      timeToDestination: -1,
      time: 'morning',
    };
    const { addDaySchedule, addDestination } = store.getState();
    addDaySchedule();
    addDestination({
      day: 1,
      destination,
    });

    const target = store
      .getState()
      .schedules[0].destinations.find(({ id }) => id === 'test-id');
    expect(target).not.toBeUndefined();
  });

  test('목적지를 삭제하였을 때, 정상적으로 제거되어야 합니다', () => {
    const store = createTravelScheduleStore();

    const destination: Destination = {
      id: 'test-id',
      name: 'test-name',
      timeToDestination: -1,
      time: 'morning',
    };
    const { addDaySchedule, addDestination, removeDestination } =
      store.getState();
    addDaySchedule();
    addDestination({
      day: 1,
      destination,
    });
    removeDestination({ day: 1, destination });

    const target = store
      .getState()
      .schedules[0].destinations.find(({ id }) => id === 'test-id');
    expect(target).toBeUndefined();
  });

  test('목적지를 수정했을 때, 정상적으로 변경되어야 합니다', () => {
    const store = createTravelScheduleStore();

    const destination: Destination = {
      id: 'test-id',
      name: 'test-name',
      timeToDestination: -1,
      time: 'morning',
    };
    const { addDaySchedule, addDestination, updateDestination } =
      store.getState();
    addDaySchedule();
    addDestination({
      day: 1,
      destination,
    });
    updateDestination({
      day: 1,
      target: destination,
      updateValue: {
        ...destination,
        name: 'changed-name',
      },
    });

    const target = store
      .getState()
      .schedules[0].destinations.find(({ id }) => id === 'test-id');
    expect(target).not.toEqual(destination);
  });
});
