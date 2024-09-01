import store from '@/store/store';

export type TextTypes =
  | 'heading-h1'
  | 'heading-h2'
  | 'heading-h3'
  | 'heading-h4'
  | 'heading-h5'
  | 'heading-h6'
  | 'subtitle-1'
  | 'subtitle-2'
  | 'body-1'
  | 'body-2'
  | 'button'
  | 'caption'
  | 'overline';

export enum wordStatus {
  NORMAL = 'normal',
  CORRECT = 'correct',
  ALMOST = 'almost',
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
