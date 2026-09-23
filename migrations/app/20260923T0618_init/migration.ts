#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/b9713ae381b09119d6829c0ca7033978a6c066cf89d892ff63339406392b0de5/contract';
import endContract from '../../snapshots/b9713ae381b09119d6829c0ca7033978a6c066cf89d892ff63339406392b0de5/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'aiGeneration',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('noteId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('prompt', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('response', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'aiGeneration_type_check_5468cb3b',
            "\"type\" IN ('EXPLAIN', 'SIMPLE_EXPLANATION', 'SUMMARY', 'INTERVIEW_QUESTIONS', 'FLASHCARDS', 'CODE_EXAMPLE', 'STUDY_PLAN', 'KNOWLEDGE_GAP')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'bookmark',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('noteId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'note',
        columns: [
          col('authorId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('content', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('published', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'progress',
        columns: [
          col('completed', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('lastViewedAt', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('noteId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('score', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('emailVerified', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('image', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('passwordHash', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', {
            notNull: true,
            default: lit('USER'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('user_role_check_1954e8c0', "\"role\" IN ('USER', 'ADMIN')"),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'note',
        constraint: 'note_slug_key',
        columns: ['slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'aiGeneration',
        index: 'aiGeneration_noteId_idx_0612c5b1',
        columns: ['noteId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'aiGeneration',
        index: 'aiGeneration_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'bookmark',
        index: 'bookmark_noteId_idx_0612c5b1',
        columns: ['noteId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'bookmark',
        index: 'bookmark_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'note',
        index: 'note_authorId_idx_e47547ed',
        columns: ['authorId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'progress',
        index: 'progress_noteId_idx_0612c5b1',
        columns: ['noteId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'progress',
        index: 'progress_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'aiGeneration',
        foreignKey: {
          name: 'aiGeneration_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'aiGeneration',
        foreignKey: {
          name: 'aiGeneration_noteId_fkey',
          columns: ['noteId'],
          references: { schema: 'public', table: 'note', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'bookmark',
        foreignKey: {
          name: 'bookmark_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'bookmark',
        foreignKey: {
          name: 'bookmark_noteId_fkey',
          columns: ['noteId'],
          references: { schema: 'public', table: 'note', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'note',
        foreignKey: {
          name: 'note_authorId_fkey',
          columns: ['authorId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'progress',
        foreignKey: {
          name: 'progress_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'progress',
        foreignKey: {
          name: 'progress_noteId_fkey',
          columns: ['noteId'],
          references: { schema: 'public', table: 'note', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
