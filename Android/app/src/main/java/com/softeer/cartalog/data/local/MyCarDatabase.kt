package com.softeer.cartalog.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.softeer.cartalog.data.model.db.MyCar
import com.softeer.cartalog.data.model.db.PriceData

@Database(entities = [MyCar::class, PriceData::class], version = 1, exportSchema = false)
abstract class MyCarDatabase : RoomDatabase() {
    abstract fun myCarDao(): MyCarDao
    abstract fun priceDataDao(): PriceDataDao

    companion object {
        @Volatile
        private var instance: MyCarDatabase? = null

        @Synchronized
        fun getInstance(context: Context): MyCarDatabase? {
            if (instance == null)
                synchronized(MyCarDatabase::class) {
                    instance = Room.databaseBuilder(
                        context,
                        MyCarDatabase::class.java,
                        "my_car.db"
                    ).build()
                }
            return instance
        }

        fun destroyInstance() {
            instance = null
        }
    }
}